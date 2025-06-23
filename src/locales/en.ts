import { LocaleType } from './zh';

export const en: LocaleType = {
  // Application title
  appTitle: "Chess Multi-Timeline Visual Editor",
  
  // Control panel
  controlPanel: {
    author: "Author",
    editMetadata: "Edit Metadata",
    undo: "Undo",
    redo: "Redo",
    import: "Import",
    export: "Export",
    boardSize: "Board Size",
    boardSizeRange: "(1-999)"
  },
  
  // Metadata editing
  metadata: {
    enterGameName: "Enter game name:",
    enterAuthorName: "Enter author name:",
    enterTurnOffset: "Enter turn offset:",
    importFailed: "Import failed: Invalid JSON format"
  },
  
  // Timeline
  timeline: {
    title: "Timeline",
    addPositiveTimeline: "Add Positive Timeline",
    addNegativeTimeline: "Add Negative Timeline",
    addZeroTimeline: "Add Zero Timeline",
    addPlusZeroTimeline: "Add +0L Timeline",
    addMinusZeroTimeline: "Add -0L Timeline",
    deleteTimeline: "Delete Timeline",
    confirmDelete: "Are you sure you want to delete this timeline?",
    copyMode: "Copy Mode",
    exitCopyMode: "Exit Copy Mode",
    selectSourceBoard: "Select Source Board",
    clickToCopy: "Click on the position to copy to"
  },
  
  // Board
  board: {
    turn: "Turn",
    addBoard: "Add Board",
    addEmptyBoard: "Add Empty Board",
    deleteBoard: "Delete Board",
    confirmDeleteBoard: "Are you sure you want to delete this board?",
    editFen: "Edit FEN",
    enterFen: "Enter FEN string:",
    invalidFen: "Invalid FEN format",
    showPieceEditor: "Show Piece Editor",
    hidePieceEditor: "Hide Piece Editor",
    emptyPosition: "Empty Position",
    copy: "Copy"
  },

  // Piece Selector
  pieceSelector: {
    selectPiece: "Select Piece",
    closePieceSelector: "Close Piece Selector",
    currentSelection: "Current Selection:",
    clickToPlace: "(Click on board square to place piece)"
  },
  
  // Language switching
  language: {
    chinese: "中文",
    english: "English",
    switchLanguage: "Switch Language"
  },
  
  // Common
  common: {
    confirm: "Confirm",
    cancel: "Cancel",
    ok: "OK",
    delete: "Delete",
    edit: "Edit",
    save: "Save"
  }
};

