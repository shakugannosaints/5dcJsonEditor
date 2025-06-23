export const zh = {
  // 应用标题
  appTitle: "国际象棋多时间线可视化编辑器",
  
  // 控制面板
  controlPanel: {
    author: "作者",
    editMetadata: "编辑元数据",
    undo: "撤销",
    redo: "重做",
    import: "导入",
    export: "导出",
    boardSize: "棋盘大小",
    boardSizeRange: "(1-999)"
  },
  
  // 元数据编辑
  metadata: {
    enterGameName: "输入棋局名称:",
    enterAuthorName: "输入作者名称:",
    enterTurnOffset: "输入回合偏移量:",
    importFailed: "导入失败：无效的JSON格式"
  },
  
  // 时间线
  timeline: {
    title: "时间线",
    addPositiveTimeline: "添加正时间线",
    addNegativeTimeline: "添加负时间线",
    addZeroTimeline: "添加零时间线",
    addPlusZeroTimeline: "添加+0L时间线",
    addMinusZeroTimeline: "添加-0L时间线",
    deleteTimeline: "删除时间线",
    confirmDelete: "确定要删除这个时间线吗？",
    copyMode: "复制模式",
    exitCopyMode: "退出复制模式",
    selectSourceBoard: "选择源棋盘",
    clickToCopy: "点击要复制到的位置"
  },
  
  // 棋盘
  board: {
    turn: "回合",
    addBoard: "添加棋盘",
    addEmptyBoard: "添加空棋盘",
    deleteBoard: "删除棋盘",
    confirmDeleteBoard: "确定要删除这个棋盘吗？",
    editFen: "编辑FEN",
    enterFen: "输入FEN字符串:",
    invalidFen: "无效的FEN格式",
    showPieceEditor: "显示棋子编辑器",
    hidePieceEditor: "隐藏棋子编辑器",
    emptyPosition: "空位置",
    copy: "复制"
  },

  // 棋子选择器
  pieceSelector: {
    selectPiece: "选择棋子",
    closePieceSelector: "关闭棋子选择",
    currentSelection: "当前选择:",
    clickToPlace: "(点击棋盘格子放置棋子)"
  },
  
  // 语言切换
  language: {
    chinese: "中文",
    english: "English",
    switchLanguage: "切换语言"
  },
  
  // 通用
  common: {
    confirm: "确认",
    cancel: "取消",
    ok: "确定",
    delete: "删除",
    edit: "编辑",
    save: "保存"
  }
};

export type LocaleType = typeof zh;

