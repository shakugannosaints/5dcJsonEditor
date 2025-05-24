// 棋子类型
export type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'P' | 'R' | 'N' | 'B' | 'Q' | 'K' | null;

// 棋盘类型
export interface Board {
  id: string;
  squares: (PieceType)[][];  // 二维数组表示棋盘
  fen: string | null;        // FEN字符串表示
}

// 时间线类型
export interface Timeline {
  id: string;           // 时间线标识，如 "1L", "-1L", "0L", "+0L", "-0L"
  boards: (Board | null)[];  // 时间线上的棋盘数组，null表示该位置没有棋盘
}

// 编辑器状态
export interface EditorState {
  name: string;
  author: string;
  timelines: Record<string, Timeline>;  // 键为时间线ID，值为时间线对象
  cosmeticTurnOffset: number;
  boardSize: number;  // 棋盘大小（边长）
  history: EditorState[];  // 历史状态，用于撤销/重做
  currentHistoryIndex: number;  // 当前历史状态索引
}

// 操作类型
export type ActionType = 
  | { type: 'IMPORT_JSON', payload: any }
  | { type: 'ADD_TIMELINE', payload: { id: string } }
  | { type: 'REMOVE_TIMELINE', payload: { id: string } }
  | { type: 'ADD_BOARD', payload: { timelineId: string, position: number, board?: Board | null } }
  | { type: 'REMOVE_BOARD', payload: { timelineId: string, position: number } }
  | { type: 'COPY_BOARD', payload: { sourceTimelineId: string, sourcePosition: number, targetTimelineId: string, targetPosition: number } }
  | { type: 'UPDATE_BOARD', payload: { timelineId: string, position: number, squares: PieceType[][] } }
  | { type: 'MOVE_PIECE', payload: { timelineId: string, boardPosition: number, fromSquare: [number, number], toSquare: [number, number] } }
  | { type: 'SET_PIECE', payload: { timelineId: string, boardPosition: number, square: [number, number], piece: PieceType } }
  | { type: 'SET_BOARD_SIZE', payload: { size: number } }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'UPDATE_METADATA', payload: { name?: string, author?: string, cosmeticTurnOffset?: number } };
