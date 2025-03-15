"use client";
import React from "react";
import { Button } from "@nextui-org/react";

interface ImageEditorToolbarProps {
  isDragMode: boolean;
  setIsDragMode: (value: boolean) => void;
  handleResetLayout: () => void;
  history: any[];
  historyIndex: number;
  setElements: (elements: any) => void;
  setHistoryIndex: (index: number) => void;
}

export const ImageEditorToolbar = ({
  isDragMode,
  setIsDragMode,
  handleResetLayout,
  history,
  historyIndex,
  setElements,
  setHistoryIndex
}: ImageEditorToolbarProps) => {
  // 简单直接的切换编辑模式
  const toggleEditMode = () => {
    setIsDragMode(!isDragMode);
  };

  return (
    <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-30">
      <div className="flex items-center rounded-lg bg-primary/10 backdrop-blur-sm px-3 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          {/* 拖拽模式切换按钮 - 使用笔/锁图标 */}
          <Button 
            color="primary"
            variant="flat"
            onClick={toggleEditMode}
            title={isDragMode ? "完成编辑并锁定" : "进入编辑模式"}
            isIconOnly={true}
            size="sm"
          >
            <svg 
              className="w-4 h-4 text-[#2F6EE7]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isDragMode ? (
                // 解锁图标 - 编辑模式开启时显示，表示当前可以编辑
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              ) : (
                // 锁定图标 - 编辑模式关闭时显示，表示当前被锁定
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              )}
            </svg>
          </Button>
          
          {/* 撤销按钮 - 仅在编辑模式下可用 */}
          <Button 
            color="primary"
            variant="flat"
            onClick={() => {
              if (isDragMode && historyIndex > 0) {
                setElements(history[historyIndex - 1]);
                setHistoryIndex(historyIndex - 1);
              }
            }}
            isDisabled={!isDragMode || historyIndex <= 0}
            title="撤销"
            isIconOnly
            size="sm"
          >
            <svg className="w-4 h-4 text-[#2F6EE7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Button>
          
          {/* 重做按钮 - 仅在编辑模式下可用 */}
          <Button 
            color="primary"
            variant="flat"
            onClick={() => {
              if (isDragMode && historyIndex < history.length - 1) {
                setElements(history[historyIndex + 1]);
                setHistoryIndex(historyIndex + 1);
              }
            }}
            isDisabled={!isDragMode || historyIndex >= history.length - 1}
            title="重做"
            isIconOnly
            size="sm"
          >
            <svg className="w-4 h-4 text-[#2F6EE7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
          
          {/* 重置布局按钮 */}
          <Button 
            color="primary"
            variant="flat"
            onClick={handleResetLayout}
            title="恢复默认布局"
            isIconOnly
            size="sm"
          >
            <svg
              className="w-4 h-4 text-[#2F6EE7]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}; 