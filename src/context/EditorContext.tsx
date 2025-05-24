import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { EditorState, ActionType, Board, PieceType } from '../types';
import { v4 as uuidv4 } from 'uuid';

// 初始状态
const initialState: EditorState = {
  name: '新棋局',
  author: '未知作者',
  timelines: {},
  cosmeticTurnOffset: 0,
  history: [],
  currentHistoryIndex: -1,
};

// 创建上下文
const EditorContext = createContext<{
  state: EditorState;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

// FEN字符串解析函数
const parseFen = (fen: string): PieceType[][] => {
  const rows = fen.split('/');
  return rows.map(row => {
    const squares: PieceType[] = [];
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (/[1-8]/.test(char)) {
        // 数字表示空格数量
        const emptyCount = parseInt(char, 10);
        for (let j = 0; j < emptyCount; j++) {
          squares.push(null);
        }
      } else {
        // 字母表示棋子
        squares.push(char as PieceType);
      }
    }
    return squares;
  });
};

// 生成FEN字符串函数
const generateFen = (squares: PieceType[][]): string => {
  return squares.map(row => {
    let fen = '';
    let emptyCount = 0;
    
    for (let i = 0; i < row.length; i++) {
      if (row[i] === null) {
        emptyCount++;
      } else {
        if (emptyCount > 0) {
          fen += emptyCount.toString();
          emptyCount = 0;
        }
        fen += row[i];
      }
    }
    
    if (emptyCount > 0) {
      fen += emptyCount.toString();
    }
    
    return fen;
  }).join('/');
};

// 创建空棋盘
const createEmptyBoard = (size: number = 8): Board => {
  const squares: PieceType[][] = Array(size).fill(null).map(() => Array(size).fill(null));
  return {
    id: uuidv4(),
    squares,
    fen: generateFen(squares),
  };
};

// 从FEN创建棋盘
const createBoardFromFen = (fen: string): Board => {
  const squares = parseFen(fen);
  return {
    id: uuidv4(),
    squares,
    fen,
  };
};

// 复制棋盘
const copyBoard = (board: Board): Board => {
  return {
    id: uuidv4(),
    squares: JSON.parse(JSON.stringify(board.squares)),
    fen: board.fen,
  };
};

// 比较两个状态是否相同
const areStatesEqual = (state1: EditorState, state2: EditorState): boolean => {
  return JSON.stringify(state1) === JSON.stringify(state2);
};

// 添加历史记录
const addToHistory = (state: EditorState): EditorState => {
  const { history, currentHistoryIndex } = state;
  
  // 创建新的历史记录
  const newHistory = history.slice(0, currentHistoryIndex + 1);
  const newState = { ...state, history: newHistory };
  
  // 如果当前状态与最新历史记录不同，则添加到历史记录
  if (newHistory.length === 0 || !areStatesEqual(newHistory[newHistory.length - 1], state)) {
    newHistory.push(JSON.parse(JSON.stringify({
      ...state,
      history: [],
      currentHistoryIndex: -1,
    })));
    
    return {
      ...newState,
      history: newHistory,
      currentHistoryIndex: newHistory.length - 1,
    };
  }
  
  return newState;
};

// Reducer函数
const editorReducer = (state: EditorState, action: ActionType): EditorState => {
  let newState: EditorState;
  
  switch (action.type) {
    case 'IMPORT_JSON':
      const importedData = action.payload;
      newState = {
        ...initialState,
        name: importedData.Name || '未命名',
        author: importedData.Author || '未知作者',
        timelines: {},
        cosmeticTurnOffset: importedData.CosmeticTurnOffset || 0,
      };
      
      // 处理时间线
      if (importedData.Timelines) {
        Object.entries(importedData.Timelines).forEach(([timelineId, boards]: [string, any]) => {
          const timelineBoards = (boards as string[]).map(fen => {
            if (fen === null) return null;
            return createBoardFromFen(fen);
          });
          
          newState.timelines[timelineId] = {
            id: timelineId,
            boards: timelineBoards,
          };
        });
      }
      
      return addToHistory(newState);
      
    case 'ADD_TIMELINE':
      const { id } = action.payload;
      if (state.timelines[id]) {
        return state; // 时间线已存在
      }
      
      newState = {
        ...state,
        timelines: {
          ...state.timelines,
          [id]: {
            id,
            boards: [],
          },
        },
      };
      
      return addToHistory(newState);
      
    case 'REMOVE_TIMELINE':
      const { id: timelineIdToRemove } = action.payload;
      const { [timelineIdToRemove]: _, ...remainingTimelines } = state.timelines;
      
      newState = {
        ...state,
        timelines: remainingTimelines,
      };
      
      return addToHistory(newState);
      
    case 'ADD_BOARD':
      const { timelineId, position, board } = action.payload;
      if (!state.timelines[timelineId]) {
        return state; // 时间线不存在
      }
      
      const timeline = state.timelines[timelineId];
      const newBoards = [...timeline.boards];
      
      // 如果位置超出数组长度，填充null
      while (newBoards.length < position) {
        newBoards.push(null);
      }
      
      // 插入新棋盘
      newBoards.splice(position, 0, board === null ? null : (board || createEmptyBoard()));
      
      newState = {
        ...state,
        timelines: {
          ...state.timelines,
          [timelineId]: {
            ...timeline,
            boards: newBoards,
          },
        },
      };
      
      return addToHistory(newState);
      
    case 'REMOVE_BOARD':
      const { timelineId: tlId, position: pos } = action.payload;
      if (!state.timelines[tlId]) {
        return state; // 时间线不存在
      }
      
      const tl = state.timelines[tlId];
      const boards = [...tl.boards];
      
      if (pos < 0 || pos >= boards.length) {
        return state; // 位置无效
      }
      
      boards.splice(pos, 1);
      
      newState = {
        ...state,
        timelines: {
          ...state.timelines,
          [tlId]: {
            ...tl,
            boards,
          },
        },
      };
      
      return addToHistory(newState);
      
    case 'COPY_BOARD':
      const { sourceTimelineId, sourcePosition, targetTimelineId, targetPosition } = action.payload;
      
      if (!state.timelines[sourceTimelineId] || !state.timelines[targetTimelineId]) {
        return state; // 时间线不存在
      }
      
      const sourceTimeline = state.timelines[sourceTimelineId];
      const sourceBoard = sourceTimeline.boards[sourcePosition];
      
      if (!sourceBoard) {
        return state; // 源棋盘不存在
      }
      
      const targetTimeline = state.timelines[targetTimelineId];
      const targetBoards = [...targetTimeline.boards];
      
      // 如果目标位置超出数组长度，填充null
      while (targetBoards.length < targetPosition) {
        targetBoards.push(null);
      }
      
      // 复制棋盘到目标位置
      targetBoards.splice(targetPosition, 0, copyBoard(sourceBoard));
      
      newState = {
        ...state,
        timelines: {
          ...state.timelines,
          [targetTimelineId]: {
            ...targetTimeline,
            boards: targetBoards,
          },
        },
      };
      
      return addToHistory(newState);
      
    case 'UPDATE_BOARD':
      const { timelineId: tlId2, position: pos2, squares } = action.payload;
      
      if (!state.timelines[tlId2]) {
        return state; // 时间线不存在
      }
      
      const tl2 = state.timelines[tlId2];
      const board2 = tl2.boards[pos2];
      
      if (!board2) {
        return state; // 棋盘不存在
      }
      
      const updatedBoard = {
        ...board2,
        squares,
        fen: generateFen(squares),
      };
      
      const updatedBoards = [...tl2.boards];
      updatedBoards[pos2] = updatedBoard;
      
      newState = {
        ...state,
        timelines: {
          ...state.timelines,
          [tlId2]: {
            ...tl2,
            boards: updatedBoards,
          },
        },
      };
      
      return addToHistory(newState);
      
    case 'MOVE_PIECE':
      const { timelineId: tlId3, boardPosition, fromSquare, toSquare } = action.payload;
      
      if (!state.timelines[tlId3]) {
        return state; // 时间线不存在
      }
      
      const tl3 = state.timelines[tlId3];
      const board3 = tl3.boards[boardPosition];
      
      if (!board3) {
        return state; // 棋盘不存在
      }
      
      const [fromRow, fromCol] = fromSquare;
      const [toRow, toCol] = toSquare;
      
      const newSquares = JSON.parse(JSON.stringify(board3.squares));
      const piece = newSquares[fromRow][fromCol];
      
      if (!piece) {
        return state; // 没有棋子可移动
      }
      
      newSquares[toRow][toCol] = piece;
      newSquares[fromRow][fromCol] = null;
      
      const updatedBoard2 = {
        ...board3,
        squares: newSquares,
        fen: generateFen(newSquares),
      };
      
      const updatedBoards2 = [...tl3.boards];
      updatedBoards2[boardPosition] = updatedBoard2;
      
      newState = {
        ...state,
        timelines: {
          ...state.timelines,
          [tlId3]: {
            ...tl3,
            boards: updatedBoards2,
          },
        },
      };
      
      return addToHistory(newState);
      
    case 'SET_PIECE':
      const { timelineId: tlId4, boardPosition: bPos, square, piece: newPiece } = action.payload;
      
      if (!state.timelines[tlId4]) {
        return state; // 时间线不存在
      }
      
      const tl4 = state.timelines[tlId4];
      const board4 = tl4.boards[bPos];
      
      if (!board4) {
        return state; // 棋盘不存在
      }
      
      const [row, col] = square;
      const newSquares2 = JSON.parse(JSON.stringify(board4.squares));
      newSquares2[row][col] = newPiece;
      
      const updatedBoard3 = {
        ...board4,
        squares: newSquares2,
        fen: generateFen(newSquares2),
      };
      
      const updatedBoards3 = [...tl4.boards];
      updatedBoards3[bPos] = updatedBoard3;
      
      newState = {
        ...state,
        timelines: {
          ...state.timelines,
          [tlId4]: {
            ...tl4,
            boards: updatedBoards3,
          },
        },
      };
      
      return addToHistory(newState);
      
    case 'UNDO':
      const { history, currentHistoryIndex } = state;
      
      if (currentHistoryIndex <= 0) {
        return state; // 没有更多历史记录可撤销
      }
      
      const previousState = history[currentHistoryIndex - 1];
      
      return {
        ...previousState,
        history,
        currentHistoryIndex: currentHistoryIndex - 1,
      };
      
    case 'REDO':
      const { history: hist, currentHistoryIndex: idx } = state;
      
      if (idx >= hist.length - 1) {
        return state; // 没有更多历史记录可重做
      }
      
      const nextState = hist[idx + 1];
      
      return {
        ...nextState,
        history: hist,
        currentHistoryIndex: idx + 1,
      };
      
    case 'UPDATE_METADATA':
      const { name, author, cosmeticTurnOffset } = action.payload;
      
      newState = {
        ...state,
        name: name !== undefined ? name : state.name,
        author: author !== undefined ? author : state.author,
        cosmeticTurnOffset: cosmeticTurnOffset !== undefined ? cosmeticTurnOffset : state.cosmeticTurnOffset,
      };
      
      return addToHistory(newState);
      
    default:
      return state;
  }
};

// Provider组件
export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  
  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
};

// 自定义Hook
export const useEditor = () => useContext(EditorContext);

// 导出工具函数
export { parseFen, generateFen, createEmptyBoard, createBoardFromFen, copyBoard };
