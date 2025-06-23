# 5dcJsonEditor 本地化功能说明

## 概述

本项目已成功添加了完整的本地化功能，支持中文和英文两种语言。用户可以通过界面右上角的语言切换按钮在两种语言之间自由切换。

## 功能特性

### 1. 语言切换
- 位置：应用程序标题栏右上角
- 支持语言：中文（zh）、英文（en）
- 切换方式：点击对应语言按钮即可切换
- 持久化：语言设置会自动保存到浏览器本地存储，下次访问时会记住用户的选择

### 2. 完整的界面翻译
所有用户界面元素都已完成本地化，包括：

#### 应用标题
- 中文：国际象棋多时间线可视化编辑器
- 英文：Chess Multi-Timeline Visual Editor

#### 控制面板
- 作者/Author
- 编辑元数据/Edit Metadata
- 撤销/Undo
- 重做/Redo
- 导入/Import
- 导出/Export
- 棋盘大小/Board Size

#### 时间线操作
- 添加正时间线/Add Positive Timeline
- 添加负时间线/Add Negative Timeline
- 添加零时间线/Add Zero Timeline
- 添加+0L时间线/Add +0L Timeline
- 添加-0L时间线/Add -0L Timeline
- 删除时间线/Delete Timeline

#### 棋盘操作
- 添加棋盘/Add Board
- 添加空棋盘/Add Empty Board
- 删除棋盘/Delete Board
- 复制/Copy
- 显示棋子编辑器/Show Piece Editor
- 隐藏棋子编辑器/Hide Piece Editor

#### 复制模式
- 复制模式/Copy Mode
- 退出复制模式/Exit Copy Mode
- 点击要复制到的位置/Click on the position to copy to

#### 确认对话框
- 确定要删除这个时间线吗？/Are you sure you want to delete this timeline?
- 确定要删除这个棋盘吗？/Are you sure you want to delete this board?

## 技术实现

### 1. 架构设计
- 使用React Context API管理语言状态
- 采用类型安全的翻译键值对结构
- 支持动态语言切换，无需刷新页面

### 2. 文件结构
```
src/
├── locales/
│   ├── index.ts      # 本地化入口文件
│   ├── zh.ts         # 中文翻译
│   └── en.ts         # 英文翻译
├── context/
│   └── LocaleContext.tsx  # 本地化上下文
└── components/
    └── LanguageSwitcher.tsx  # 语言切换组件
```

### 3. 核心组件

#### LocaleContext
- 管理当前语言状态
- 提供语言切换功能
- 自动保存用户语言偏好到localStorage

#### LanguageSwitcher
- 美观的语言切换界面
- 高亮显示当前选中语言
- 响应式设计，适配不同屏幕尺寸

### 4. 使用方法
在任何组件中使用本地化功能：

```typescript
import { useLocale } from '../context/LocaleContext';

const MyComponent = () => {
  const { t, locale, setLocale } = useLocale();
  
  return (
    <div>
      <h1>{t.appTitle}</h1>
      <button>{t.controlPanel.editMetadata}</button>
    </div>
  );
};
```

## 扩展性

### 添加新语言
1. 在 `src/locales/` 目录下创建新的语言文件（如 `fr.ts`）
2. 按照现有结构添加翻译内容
3. 在 `src/locales/index.ts` 中导入新语言
4. 在 `LanguageSwitcher.tsx` 中添加新语言按钮

### 添加新翻译键
1. 在 `zh.ts` 中添加新的翻译键值对
2. 在 `en.ts` 中添加对应的英文翻译
3. TypeScript 会自动提供类型检查，确保所有语言文件保持一致

## 测试验证

本地化功能已通过以下测试：
- ✅ 语言切换功能正常工作
- ✅ 所有界面元素都已正确翻译
- ✅ 语言设置持久化保存
- ✅ 页面刷新后语言设置保持不变
- ✅ 中英文切换流畅，无页面闪烁
- ✅ 响应式设计在不同屏幕尺寸下正常显示

## 总结

本次本地化改造为5dcJsonEditor项目带来了完整的多语言支持，提升了用户体验，使项目能够服务更广泛的国际用户群体。整个实现采用了现代化的React开发模式，具有良好的可维护性和扩展性。

