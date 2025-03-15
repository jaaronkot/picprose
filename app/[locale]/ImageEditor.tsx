"use client";
import React from "react";
import "./devicon.min.css";
import {
  Spinner,
} from "@nextui-org/react";
import { usePicprose } from "./PicproseContext";

// 添加Props类型定义
interface ImageEditorProps {
  isDragMode: boolean;
  elements: {
    title: { x: number; y: number; visible: boolean };
    author: { x: number; y: number; visible: boolean };
    icon: { x: number; y: number; visible: boolean };
    image: { x: number; y: number };
  };
  setElements: React.Dispatch<React.SetStateAction<{
    title: { x: number; y: number; visible: boolean };
    author: { x: number; y: number; visible: boolean };
    icon: { x: number; y: number; visible: boolean };
    image: { x: number; y: number };
  }>>;
  saveHistory: (elements: any) => void;
}

export const ImageEditor = ({ 
  isDragMode, 
  elements, 
  setElements,
  saveHistory
}: ImageEditorProps) => {
  const { propertyInfo, imageInfo } = usePicprose();
  const [isLoading, setIsLoading] = React.useState(false);
  const [imagePosition, setImagePosition] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStartY, setDragStartY] = React.useState(0);
  const [imageHorizontalPosition, setImageHorizontalPosition] = React.useState(0);
  const imageRef = React.useRef<HTMLImageElement>(null);
  
  // 拖动状态
  const [draggingElement, setDraggingElement] = React.useState<string | null>(null);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  
  // 添加拖动边界检测
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // 直接从Context获取所有属性
  const {
    aspect,
    blur,
    blurTrans,
    title,
    subTitle,
    author,
    icon,
    devicon,
    font,
    fontSizeValue,
    authorFontSizeValue,
    color,
    logoPosition,
  } = propertyInfo;

  React.useEffect(() => {
    if(imageInfo.url) {
      setIsLoading(true);
    }
  }, [imageInfo.url]);

  // 处理图片的水平和垂直拖动
  const handleImageMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isDragMode) return;
    setIsDragging(true);
    setDragStartY(e.clientY - imagePosition);
    setDragStart({ 
      x: e.clientX - imageHorizontalPosition, 
      y: e.clientY - imagePosition 
    });
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && imageRef.current) {
      // 支持双向拖动
      const newVerticalPosition = e.clientY - dragStartY;
      const newHorizontalPosition = e.clientX - dragStart.x;
      
      // 添加边界限制
      const container = containerRef.current;
      const image = imageRef.current;
      
      if (container && image) {
        const containerRect = container.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();
        
        // 确保图片不会完全拖出视图
        const minX = containerRect.width - imageRect.width;
        const maxX = 0;
        const minY = containerRect.height - imageRect.height;
        const maxY = 0;
        
        const boundedX = Math.max(minX, Math.min(maxX, newHorizontalPosition));
        const boundedY = Math.max(minY, Math.min(maxY, newVerticalPosition));
        
        setImagePosition(boundedY);
        setImageHorizontalPosition(boundedX);
      } else {
        setImagePosition(newVerticalPosition);
        setImageHorizontalPosition(newHorizontalPosition);
      }
    }
    
    // 处理其他元素拖动
    if (draggingElement && isDragMode) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      if (draggingElement === 'title' || draggingElement === 'author' || 
          draggingElement === 'icon' || draggingElement === 'image') {
        handleElementDragImpl(draggingElement, deltaX, deltaY);
      }
      
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    if (isDragging || draggingElement) {
      saveHistory(elements); // 保存操作历史
    }
    setIsDragging(false);
    setDraggingElement(null);
  };

  // 元素拖动开始处理
  const handleElementDragStart = (element: string, e: React.MouseEvent) => {
    if (!isDragMode) return;
    e.stopPropagation();
    setDraggingElement(element);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  React.useEffect(() => {
    if (isDragging || draggingElement) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStartY, draggingElement, dragStart, isDragMode]);

  // 修复TypeScript错误的元素拖动处理函数
  const handleElementDragImpl = (elementKey: 'title' | 'author' | 'icon' | 'image', deltaX: number, deltaY: number) => {
    setElements(prev => {
      const newElements = {...prev};
      if (elementKey === 'title') {
        newElements.title = {
          ...newElements.title,
          x: newElements.title.x + deltaX,
          y: newElements.title.y + deltaY
        };
      } else if (elementKey === 'author') {
        newElements.author = {
          ...newElements.author,
          x: newElements.author.x + deltaX,
          y: newElements.author.y + deltaY
        };
      } else if (elementKey === 'icon') {
        newElements.icon = {
          ...newElements.icon,
          x: newElements.icon.x + deltaX,
          y: newElements.icon.y + deltaY
        };
      } else if (elementKey === 'image') {
        newElements.image = {
          ...newElements.image,
          x: newElements.image.x + deltaX,
          y: newElements.image.y + deltaY
        };
      }
      return newElements;
    });
  };

  const renderIcon = () => {
    if (devicon.length !== 0) {
      return (
        <div 
          className={`m-4 items-center justify-center flex ${isDragMode ? 'cursor-move' : ''}`}
          onMouseDown={(e) => handleElementDragStart('icon', e)}
        >
          <i className={`devicon-${devicon} text-white dev-icon text-4xl`}></i>
        </div>
      );
    } else if (icon.length > 0) {
      return (
        <div 
          className={`${isDragMode ? 'cursor-move' : ''}`}
          onMouseDown={(e) => handleElementDragStart('icon', e)}
        >
          <img
            src={icon}
            alt="img"
            className="w-12 h-12 m-2 rounded-full"
          />
        </div>
      );
    } else {
      return "";
    }
  };

  return (
    <div className="max-h-screen relative flex group rounded-3xl">
      <div
        ref={containerRef}
        style={{ maxHeight: "90vh", overflow: "hidden", position: "relative" }}
        className={aspect == "" ? "aspect-[16/9]" : aspect}
      >
        <img
          ref={imageRef}
          src={imageInfo.url}
          alt="Image"
          className={`rounded-md object-cover h-full w-full ${isDragMode ? 'cursor-move' : ''}`}
          style={{ 
            transform: `translate(${imageHorizontalPosition}px, ${imagePosition}px)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
          onLoad={() => setIsLoading(false)}
          onMouseDown={handleImageMouseDown}
          draggable={false}
        />

        {/* 网格辅助线 */}
        {isDragMode && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="border border-white/10"></div>
            ))}
          </div>
        )}
        
        {/* 拖动模式提示 */}
        {isDragMode && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
            <div className="bg-white/80 text-black px-4 py-2 rounded-lg">
              拖动模式：可拖动图片、标题、作者和图标
            </div>
          </div>
        )}
      </div>

      {/* 内容覆盖层 */}
      <div
        style={{
          backgroundColor: color == "" ? "#1F293799" : color + blurTrans,
          pointerEvents: isDragMode ? 'none' : 'auto'
        }}
        className={"absolute top-0 right-0 left-0 rounded-md h-full " + blur}
      >
        {/* 使用统一的绝对定位容器 */}
        <div className="absolute inset-0" style={{ pointerEvents: isDragMode ? 'auto' : 'none' }}>
          {/* 标题元素 */}
          <div 
            className={`absolute ${isDragMode ? 'cursor-move border border-dashed border-white/30' : ''}`}
            style={{ 
              left: '50%',
              top: '40%',
              transform: `translate(-50%, -50%) translate(${elements.title.x}px, ${elements.title.y}px)`,
              transition: draggingElement === 'title' ? 'none' : 'transform 0.1s ease-out',
              padding: isDragMode ? '8px' : '0',
            }}
            onMouseDown={(e) => handleElementDragStart('title', e)}
          >
            <h1
              className={`leading-tight text-center text-5xl font-bold text-white ${font}`}
              style={{ fontSize: `${fontSizeValue}px` }}
            >
              {title}
            </h1>
          </div>
          
          {/* 作者元素 */}
          <div 
            className={`absolute ${isDragMode ? 'cursor-move border border-dashed border-white/30' : ''}`}
            style={{ 
              left: '50%',
              top: '60%',
              transform: `translate(-50%, -50%) translate(${elements.author.x}px, ${elements.author.y}px)`,
              transition: draggingElement === 'author' ? 'none' : 'transform 0.1s ease-out',
              padding: isDragMode ? '8px' : '0',
            }}
            onMouseDown={(e) => handleElementDragStart('author', e)}
          >
            <h2
              className={`text-xl font-semibold text-center text-white ${font}`}
              style={{ fontSize: `${authorFontSizeValue}px` }}
            >
              {author}
            </h2>
          </div>
          
          {/* 图标容器 */}
          <div 
            className={`absolute ${isDragMode ? 'cursor-move border border-dashed border-white/30' : ''}`}
            style={{ 
              left: logoPosition === "default" ? '50%' : '0',
              top: logoPosition === "default" ? '70%' : '0',
              transform: `translate(${logoPosition === "default" ? '-50%, -50%' : '0, 0'}) translate(${elements.icon.x}px, ${elements.icon.y}px)`,
              transition: draggingElement === 'icon' ? 'none' : 'transform 0.1s ease-out',
              padding: isDragMode ? '8px' : '0',
            }}
            onMouseDown={(e) => handleElementDragStart('icon', e)}
          >
            {renderIcon()}
          </div>
        </div>

        {isLoading && <Spinner className={"absolute bottom-8 left-8"} />}
      </div>

      <div className="absolute  bottom-4 right-4 opacity-80">
        <div className=" group-hover:flex hidden items-center">
          <span className="text-sm text-white mx-2">Photo by</span>
          <a
            href={imageInfo.profile}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer flex items-center bg-gray-300 rounded-full text-sm"
          >
            <img
              src={imageInfo.avatar}
              alt={imageInfo.name}
              className="h-6 w-6 rounded-full mr-2"
            />
            <span className="pr-2">{imageInfo.name}</span>
          </a>

          <a
            href="https://unsplash.com/?utm_source=PicProse&utm_medium=referral"
            target="_blank"
            className="text-sm text-white mx-2"
          >
            Unsplash
          </a>
        </div>
      </div>
    </div>
  );
};

// 添加类型定义以支持window对象扩展
declare global {
  interface Window {
    ImageEditorState?: {
      isDragMode: boolean;
      setIsDragMode: (value: boolean) => void;
      handleResetLayout: () => void;
      history: any[];
      historyIndex: number;
      setElements: (elements: any) => void;
      setHistoryIndex: (index: number) => void;
      saveHistory: () => void;
    };
  }
}
