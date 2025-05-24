# 国际象棋多时间线可视化编辑器 / Chess Multi-Timeline Visual Editor

<div align="center">
  <button onclick="toggleLanguage()">🌐 English</button>
  <button onclick="toggleLanguage()">🌐 中文</button>
</div>

---

<div id="chinese-content">

# 国际象棋多时间线可视化编辑器使用说明

## 项目概述

这是一个基于React的国际象棋多时间线可视化编辑器，支持以下功能：

- 导入/导出特定格式的JSON文件
- 创建和管理多个时间线（正数、负数、零时间线）
- 在时间线上添加、删除和复制棋盘
- 自由放置和移动棋子
- 撤销/重做操作
- 响应式设计，适配不同设备

## 部署说明

### 开发环境运行

1. 解压`chess_editor_source.zip`文件
2. 进入项目目录：`cd chess_editor_app`
3. 安装依赖：`pnpm install`
4. 启动开发服务器：`pnpm run dev`
5. 在浏览器中访问：`http://localhost:5173`

### 生产环境部署

1. 解压`chess_editor_source.zip`文件
2. 进入项目目录：`cd chess_editor_app`
3. 安装依赖：`pnpm install`
4. 构建项目：`pnpm build`
5. 部署`dist`目录中的文件到您的Web服务器

## 使用说明

### 导入/导出功能

- 点击控制面板中的"导入"按钮，选择JSON文件进行导入
- 点击"导出"按钮，将当前编辑器状态导出为JSON文件

### 时间线管理

- 使用时间线列表上方的按钮添加不同类型的时间线
- 时间线按照负数在上、正数在下的顺序排列
- 点击时间线上的"删除时间线"按钮可移除整个时间线

### 棋盘操作

- 点击时间线中的"添加棋盘"按钮在时间线末尾添加新棋盘
- 点击棋盘下方的"删除"按钮移除棋盘
- 可以跨时间线复制棋盘
- 可以添加空棋盘了（2025-5-24更新）

### 棋子操作

- 拖拽棋子可以在棋盘内或跨棋盘移动
- 棋子可以自由放置，不受国际象棋规则限制

### 撤销/重做

- 点击控制面板中的"撤销"和"重做"按钮
- 也可以使用键盘快捷键：Ctrl+Z（撤销）和Ctrl+Y（重做）

### 元数据编辑

- 点击"编辑元数据"按钮可以修改棋局名称、作者和回合偏移量

## JSON格式说明

编辑器支持的JSON格式如下：

```json
{
  "Name": "棋局名称",
  "Author": "作者名称",
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

- `Name`：棋局名称
- `Author`：作者名称
- `Timelines`：包含多个时间线的对象
  - 键为时间线ID（如"-1L", "0L", "+0L"等）
  - 值为棋盘状态数组，每个元素是FEN字符串或`null`
- `CosmeticTurnOffset`：回合偏移量

## 项目结构

- `src/components/`：UI组件
- `src/context/`：状态管理
- `src/types/`：TypeScript类型定义
- `public/`：静态资源

## 技术栈

- React + TypeScript
- React DnD（拖放功能）
- Tailwind CSS（样式）
- Vite（构建工具）

## 注意事项

- 编辑器支持不同大小的棋盘（5x5, 8x8等）
- 特殊的"+0L"和"-0L"时间线需要特别处理
- 导入的JSON文件必须符合指定格式

## 鸣谢

- Manus
- Github Copilot
- Claude Opus 4

</div>

<div id="english-content" style="display: none;">

# Chess Multi-Timeline Visual Editor User Guide

## Project Overview

This is a React-based chess multi-timeline visual editor that supports the following features:

- Import/export specific format JSON files
- Create and manage multiple timelines (positive, negative, zero timelines)
- Add, delete, and copy boards on timelines
- Freely place and move pieces
- Undo/redo operations
- Responsive design, adaptable to different devices

## Deployment Instructions

### Development Environment

1. Extract the `chess_editor_source.zip` file
2. Navigate to the project directory: `cd chess_editor_app`
3. Install dependencies: `pnpm install`
4. Start the development server: `pnpm run dev`
5. Access in browser: `http://localhost:5173`

### Production Deployment

1. Extract the `chess_editor_source.zip` file
2. Navigate to the project directory: `cd chess_editor_app`
3. Install dependencies: `pnpm install`
4. Build the project: `pnpm build`
5. Deploy the files in the `dist` directory to your web server

## Usage Instructions

### Import/Export Functions

- Click the "Import" button in the control panel to select and import JSON files
- Click the "Export" button to export the current editor state as a JSON file

### Timeline Management

- Use the buttons above the timeline list to add different types of timelines
- Timelines are arranged with negative numbers at the top and positive numbers at the bottom
- Click the "Delete Timeline" button on a timeline to remove the entire timeline

### Board Operations

- Click the "Add Board" button in a timeline to add a new board at the end of the timeline
- Click the "Delete" button below a board to remove the board
- Boards can be copied across timelines
- Empty boards can now be added (Updated 2025-5-24)

### Piece Operations

- Drag pieces to move them within boards or across boards
- Pieces can be placed freely, not restricted by chess rules

### Undo/Redo

- Click the "Undo" and "Redo" buttons in the control panel
- You can also use keyboard shortcuts: Ctrl+Z (Undo) and Ctrl+Y (Redo)

### Metadata Editing

- Click the "Edit Metadata" button to modify game name, author, and turn offset

## JSON Format Description

The JSON format supported by the editor is as follows:

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
  - Keys are timeline IDs (such as "-1L", "0L", "+0L", etc.)
  - Values are arrays of board states, each element is a FEN string or `null`
- `CosmeticTurnOffset`: Turn offset

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

## Notes

- The editor supports different board sizes (5x5, 8x8, etc.)
- Special "+0L" and "-0L" timelines require special handling
- Imported JSON files must conform to the specified format

## Acknowledgments

- Manus
- Github Copilot
- Claude Opus 4

</div>

<script>
function toggleLanguage() {
  const chineseContent = document.getElementById('chinese-content');
  const englishContent = document.getElementById('english-content');
  
  if (chineseContent.style.display === 'none') {
    chineseContent.style.display = 'block';
    englishContent.style.display = 'none';
  } else {
    chineseContent.style.display = 'none';
    englishContent.style.display = 'block';
  }
}
</script>

<style>
button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

#chinese-content, #english-content {
  transition: opacity 0.3s ease-in-out;
}
</style>
