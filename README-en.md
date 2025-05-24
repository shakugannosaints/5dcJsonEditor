# 5dc Multi-Timeline Visual Editor User Manual

🌐 **Language**  
[中文](README.md) | [English](README-en.md) |

## Project Overview

This is a React-based multi-timeline visual editor for chess with the following features:

- Import/export JSON files in a specific format
- Create and manage multiple timelines (positive, negative, and zero timelines)
- Add, delete, and duplicate chessboards on timelines
- Freely place and move chess pieces
- Undo/redo functionality
- Responsive design for various devices

## Deployment Instructions

### Running in Development Environment

1. Unzip the `chess_editor_source.zip` file
2. Navigate to the project directory: `cd chess_editor_app`
3. Install dependencies: `pnpm install`
4. Start the development server: `pnpm run dev`
5. Access in your browser at: `http://localhost:5173`

### Production Deployment

1. Unzip the `chess_editor_source.zip` file
2. Navigate to the project directory: `cd chess_editor_app`
3. Install dependencies: `pnpm install`
4. Build the project: `pnpm build`
5. Deploy the files in the `dist` directory to your web server

## Usage Instructions

### Import/Export Functionality

- Click the "Import" button in the control panel to select and import a JSON file
- Click the "Export" button to export the current editor state as a JSON file

### Timeline Management

- Use the buttons above the timeline list to add different types of timelines
- Timelines are arranged with negative numbers above and positive numbers below
- Click the "Delete Timeline" button on a timeline to remove the entire timeline

### Chessboard Operations

- Click the "Add Chessboard" button on a timeline to append a new chessboard
- Click the "Delete" button below a chessboard to remove it
- Chessboards can be duplicated across timelines
- Empty chessboards can now be added (updated 2025-5-24)

### Piece Operations

- Drag and drop pieces to move them within or across chessboards
- Pieces can be placed freely without chess rule restrictions

### Undo/Redo

- Click the "Undo" and "Redo" buttons in the control panel
- Keyboard shortcuts are also available: Ctrl+Z (Undo) and Ctrl+Y (Redo)

### Metadata Editing

- Click the "Edit Metadata" button to modify game name, author, and turn offset

## JSON Format Specification

The editor supports the following JSON format:

```json
{
  "Name": "Game Name",
  "Author": "Author Name",
  "Timelines": {
    "-1L": [
      "3k1/5/5/2K2/5"
    ],
    "0L": [
      "3k1/5/5/2K2/5"
    ],
    "+0L": [
      null, "8/8/8/8/8/8/8/8"
    ]
  },
  "CosmeticTurnOffset": -1
}
```

- `Name`: Game name
- `Author`: Author name
- `Timelines`: Object containing multiple timelines
  - Keys are timeline IDs (e.g., "-1L", "0L", "+0L")
  - Values are arrays of chessboard states, each element being a FEN string or `null`
- `CosmeticTurnOffset`: Turn offset value

## Project Structure

- `src/components/`: UI components
- `src/context/`: State management
- `src/types/`: TypeScript type definitions
- `public/`: Static assets

## Technology Stack

- React + TypeScript
- React DnD (drag and drop functionality)
- Tailwind CSS (styling)
- Vite (build tool)

## Important Notes

- The editor supports chessboards of various sizes (5x5, 8x8, etc.)
- Special "+0L" and "-0L" timelines require special handling
- Imported JSON files must conform to the specified format

## Acknowledgments

- Manus
- GitHub Copilot
- Claude Opus 4