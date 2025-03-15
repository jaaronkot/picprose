"use client";
import React from "react";
import {
  Listbox,
  ListboxItem,
  Chip,
  ScrollShadow,
  Avatar,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { LeftResourcePanel } from "./LeftResourcePanel";
import { RightPropertyPanel } from "./RightPropertyPanel";
import { users } from "./data";
import { ImageEditor } from "./ImageEditor";
import { ImageEditorToolbar } from "./ImageEditorToolbar";
import { PicproseProvider } from "./PicproseContext";

// 定义编辑器状态类型
type EditorElements = {
  title: { x: number; y: number; visible: boolean };
  author: { x: number; y: number; visible: boolean };
  icon: { x: number; y: number; visible: boolean };
  image: { x: number; y: number };
};

export default function Home() {
  const [selectedImage, setSelectedImage] = React.useState({});
  
  // 提升所有状态到最顶层组件
  const [isDragMode, setIsDragMode] = React.useState(false);
  const [elements, setElements] = React.useState<EditorElements>({
    title: { x: 0, y: 0, visible: true },
    author: { x: 0, y: 0, visible: true },
    icon: { x: 0, y: 0, visible: true },
    image: { x: 0, y: 0 }
  });
  const [history, setHistory] = React.useState<EditorElements[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState(-1);

  // 处理下载图片的方法
  const handleDownload = (format: string) => {
    console.log(`Downloading image as ${format}`);
    // ... 实现下载逻辑 ...
  };

  // 重置所有编辑器状态
  const handleResetLayout = () => {
    setElements({
      title: { x: 0, y: 0, visible: true },
      author: { x: 0, y: 0, visible: true },
      icon: { x: 0, y: 0, visible: true },
      image: { x: 0, y: 0 }
    });
    setHistory([]);
    setHistoryIndex(-1);
    setIsDragMode(false);
  };

  // 保存历史记录
  const saveHistory = (currentElements: EditorElements) => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), {...currentElements}]);
    setHistoryIndex(prev => prev + 1);
  };

  return (
    <PicproseProvider onDownload={handleDownload}>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-12 h-screen max-h-screen">
        <div className="lg:col-span-3 h-screen overflow-hidden">
          <LeftResourcePanel />
        </div>
        <div className="lg:col-span-6 flex flex-col bg-white dark:bg-gray-900 h-screen max-h-screen overflow-hidden relative">
          {/* 图片编辑器占据整个空间 */}
          <div className="flex-1 flex justify-center items-center">
            <ImageEditor 
              isDragMode={isDragMode}
              elements={elements}
              setElements={setElements}
              saveHistory={saveHistory}
            />
          </div>
          
          {/* 工具栏浮动在上方 */}
          <ImageEditorToolbar 
            isDragMode={isDragMode}
            setIsDragMode={setIsDragMode}
            handleResetLayout={handleResetLayout}
            history={history}
            historyIndex={historyIndex}
            setElements={setElements}
            setHistoryIndex={setHistoryIndex}
          />
        </div>
        <div className="lg:col-span-3 h-screen overflow-hidden">
          <RightPropertyPanel />
        </div>
      </div>
    </PicproseProvider>
  );
}
