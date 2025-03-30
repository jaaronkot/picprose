"use client";
import React, { useCallback, useEffect, useRef, useReducer } from "react";
import "./devicon.min.css";
import {
  Spinner,
} from "@nextui-org/react";
import { usePicprose } from "./PicproseContext";

// 类型定义
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
  handleResetLayout: () => void;
}

// 拖动元素类型
type DraggableElement = 'title' | 'author' | 'icon' | 'image' | null;

// 网格步长常量
const GRID_STEP = 10;

export const ImageEditor = ({ 
  isDragMode, 
  elements, 
  setElements,
  saveHistory,
  handleResetLayout
}: ImageEditorProps) => {
  // 从Context获取配置
  const { 
    propertyInfo, 
    imageInfo, 
    backgroundType,
    backgroundColor, 
    backgroundPattern,
    elementsLayout
  } = usePicprose();
  
  // 解构属性
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
    titleWidthValue,
  } = propertyInfo;

  // 状态定义
  const [isLoading, setIsLoading] = React.useState(false);
  const [imagePosition, setImagePosition] = React.useState(0);
  const [gridLines, setGridLines] = React.useState({ horizontal: 0, vertical: 0 });
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  
  // 拖动状态
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStartY, setDragStartY] = React.useState(0);
  const [draggingElement, setDraggingElement] = React.useState<DraggableElement>(null);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  
  // 引用
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 辅助函数：将值对齐到网格
  const snapToGrid = (value: number): number => {
    return Math.round(value / GRID_STEP) * GRID_STEP;
  };

  // 图片加载
  useEffect(() => {
    if (imageInfo.url) {
      setIsLoading(true);
    }
  }, [imageInfo.url]);

  // 图片垂直居中和加载处理
  useEffect(() => {
    const centerImageVertically = () => {
      if (imageRef.current && containerRef.current) {
        const container = containerRef.current;
        const image = imageRef.current;
        
        // 等待图片加载完成后获取尺寸
        const checkImageSize = () => {
          // 在cover模式下，图片居中显示，初始位置为0（对应50%）
          setImagePosition(0);
        };
        
        // 如果图片已经加载完成，直接计算位置
        if (image.complete && image.naturalHeight > 0) {
          checkImageSize();
        }
      }
    };
    
    const handleImageLoad = () => {
      setIsLoading(false);
      // 图片加载完成后居中图片
      setTimeout(centerImageVertically, 10); // 小延迟确保DOM更新
    };
    
    const imgElement = imageRef.current;
    if (imgElement) {
      imgElement.addEventListener('load', handleImageLoad);
      // 如果图片已经加载完成，立即处理
      if (imgElement.complete) {
        handleImageLoad();
      }
    }
    
    return () => {
      if (imgElement) {
        imgElement.removeEventListener('load', handleImageLoad);
      }
    };
  }, [imageInfo.url]);
  
  // 计算网格线
  useEffect(() => {
    if (containerRef.current && isDragMode) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      const MAX_LINES = 1000;
      const horizontalLines = Math.min(Math.floor(height / GRID_STEP), MAX_LINES);
      const verticalLines = Math.min(Math.floor(width / GRID_STEP), MAX_LINES);
      
      setGridLines({ horizontal: horizontalLines, vertical: verticalLines });
    }
  }, [isDragMode, containerRef.current?.clientWidth, containerRef.current?.clientHeight]);

  // 图片拖动事件处理
  const handleImageMouseDown = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    if (!isDragMode) return;
    setIsDragging(true);
    setDragStartY(e.clientY);
    setDragStart({ 
      x: e.clientX,
      y: e.clientY
    });
    e.stopPropagation();
  }, [isDragMode]);

  // 容器点击处理
  const handleContainerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragMode) return;
    
    const isClickOnDraggableElement = e.target !== containerRef.current;
    
    if (!isClickOnDraggableElement) {
      setIsDragging(true);
      setDragStartY(e.clientY);
      setDragStart({ 
        x: e.clientX,
        y: e.clientY
      });
    }
  };
  
  // 元素拖动开始
  const handleElementDragStart = (element: DraggableElement, e: React.MouseEvent) => {
    if (!isDragMode) return;
    e.stopPropagation();
    setDraggingElement(element);
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  // 鼠标移动处理 - 修复图片拖拽逻辑
  const handleMouseMove = (e: MouseEvent) => {
    // 处理图片拖动
    if (isDragging && imageRef.current) {
      // 计算鼠标移动距离
      const mouseDelta = e.clientY - dragStartY;
      
      const container = containerRef.current;
      const image = imageRef.current;
      
      if (container && image) {
        // 使用cover模式时，通过object-position控制显示位置
        // imagePosition的范围应该在合理的百分比范围内
        
        // 计算新的位置值，基于鼠标移动距离
        const sensitivity = 2.5; // 拖拽灵敏度，增加响应速度
        const newPosition = imagePosition + (mouseDelta * sensitivity);
        
        // 限制范围：允许从显示图片顶部(-300)到底部(300)
        // 这个范围对应object-position的20%到80%，提供更大的调整空间
        const minPosition = -300;
        const maxPosition = 300;
        
        const boundedPosition = Math.max(minPosition, Math.min(maxPosition, newPosition));
        
        // 设置新位置
        setImagePosition(boundedPosition);
        
        // 更新拖拽起始点，使拖拽连续
        setDragStartY(e.clientY);
      } else {
        // 容器或图片不存在时的fallback
        const sensitivity = 2.5;
        const newPosition = imagePosition + (mouseDelta * sensitivity);
        const boundedPosition = Math.max(-300, Math.min(300, newPosition));
        setImagePosition(boundedPosition);
        setDragStartY(e.clientY);
      }
    }
    
    // 处理元素拖动
    if (draggingElement && isDragMode) {
      const deltaX = snapToGrid(e.clientX - dragStart.x);
      const deltaY = snapToGrid(e.clientY - dragStart.y);
      
      if (deltaX !== 0 || deltaY !== 0) {
        handleElementDrag(draggingElement, deltaX, deltaY);
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    }
  };
  
  // 处理元素拖动
  const handleElementDrag = (elementKey: DraggableElement, deltaX: number, deltaY: number) => {
    if (!elementKey) return;
    
    setElements(prev => {
      const newElements = {...prev};
      
      // 为image元素特殊处理
      if (elementKey === 'image') {
        newElements[elementKey] = {
          ...newElements[elementKey],
          x: snapToGrid(newElements[elementKey].x + deltaX),
          y: snapToGrid(newElements[elementKey].y + deltaY)
        };
      } else {
        // 针对带有visible属性的元素
        newElements[elementKey] = {
          ...newElements[elementKey],
          x: snapToGrid(newElements[elementKey].x + deltaX),
          y: snapToGrid(newElements[elementKey].y + deltaY),
          visible: (newElements[elementKey] as any).visible // 保留visible属性
        };
      }
      
      return newElements;
    });
  };
  
  // 鼠标释放处理
  const handleMouseUp = () => {
    if (isDragging || draggingElement) {
      saveHistory(elements);
    }
    setIsDragging(false);
    setDraggingElement(null);
  };
  
  // 添加/移除事件监听器
  useEffect(() => {
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
  }, [isDragging, draggingElement, dragStart, isDragMode]);
  
  // 渲染图标
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
    }
    return null;
  };
  
  // 计算宽高比
  const calculateAspectRatio = () => {
    if (!aspect || !aspect.includes('/')) {
      return { width: '90vh', height: '90vh' };
    }
    
    try {
      const ratioStr = aspect.replace('aspect-[', '').replace(']', '');
      const [w, h] = ratioStr.split('/').map(n => parseFloat(n.trim()));
      
      if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
        return { width: '90vh', height: '90vh' };
      }
      
      if (Math.abs(w - h) < 0.01) {
        return { width: '90vh', height: '90vh' };
      } else if (h > w) {
        return { width: `${90 * w / h}vh`, height: '90vh' };
      } else {
        return { width: '90vh', height: `${90 * h / w}vh` };
      }
    } catch (e) {
      return { width: '90vh', height: '90vh' };
    }
  };
  
  // 渲染背景
  const renderBackground = () => {
    switch (backgroundType) {
      case 'image':
        return (
          <img
            ref={imageRef}
            src={imageInfo.url}
            alt="Background"
            className={`rounded-md ${isDragMode ? 'cursor-move' : ''}`}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: `center ${50 - imagePosition * 0.1}%`,
              transition: isDragging ? 'none' : 'object-position 0.1s ease-out',
            }}
            onMouseDown={handleImageMouseDown}
            draggable={false}
          />
        );
      case 'color':
        return (
          <div
            className="rounded-md w-full h-full"
            style={{ 
              background: backgroundColor,
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        );
      case 'pattern':
        return (
          <div
            className="rounded-md w-full h-full"
            style={{ 
              background: backgroundPattern.split('|')[0], 
              backgroundColor: backgroundPattern.split('|')[1] || '#ffffff',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        );
      case 'svg':
        return (
          <div
            className="rounded-md w-full h-full"
            style={{ 
              backgroundImage: backgroundPattern,
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        );
      default:
        return null;
    }
  };
  
  // 渲染网格
  const renderGrid = () => {
    if (!isDragMode) return null;
    
    return (
      <>
        {/* 主网格 - 大区域分隔 */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border border-white/20"></div>
          ))}
        </div>
        
        {/* 细网格 - 10像素对齐辅助线 */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 横向线条 */}
          {Array.from({ length: gridLines.horizontal }).map((_, i) => (
            <div 
              key={`h-${i}`} 
              className="absolute left-0 right-0 border-t border-white/10"
              style={{ top: `${i * GRID_STEP}px`, height: '1px' }}
            ></div>
          ))}
          
          {/* 纵向线条 */}
          {Array.from({ length: gridLines.vertical }).map((_, i) => (
            <div 
              key={`v-${i}`} 
              className="absolute top-0 bottom-0 border-l border-white/10" 
              style={{ left: `${i * GRID_STEP}px`, width: '1px' }}
            ></div>
          ))}
        </div>
      </>
    );
  };
  
  // 渲染可拖动元素
  const renderDraggableElements = () => {
    return (
      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        {/* 标题元素 */}
        <div 
          className={`absolute ${isDragMode ? 'cursor-move border border-dashed border-white/30' : ''}`}
          style={{ 
            left: '50%',
            top: '40%',
            transform: `translate(-50%, -50%) translate(${elements.title.x}px, ${elements.title.y}px)`,
            transition: draggingElement === 'title' ? 'none' : 'transform 0.1s ease-out',
            padding: isDragMode ? '8px' : '0',
            pointerEvents: isDragMode ? 'auto' : 'none',
            visibility: elements.title.visible ? 'visible' : 'hidden',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onMouseDown={(e) => handleElementDragStart('title', e)}
        >
          <h1
            className={`leading-tight text-center text-5xl font-bold text-white ${font}`}
            style={{ 
              fontSize: `${fontSizeValue}px`,
              width: titleWidthValue ? `${titleWidthValue}%` : 'auto',
              wordWrap: 'break-word'
            }}
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
            pointerEvents: isDragMode ? 'auto' : 'none',
            visibility: elements.author.visible ? 'visible' : 'hidden'
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
        {(devicon.length > 0 || icon.length > 0) && (
          <div 
            className={`absolute ${isDragMode ? 'cursor-move border border-dashed border-white/30' : ''}`}
            style={{ 
              left: logoPosition === "default" ? '50%' : '0',
              top: logoPosition === "default" ? '70%' : '0',
              transform: `translate(${logoPosition === "default" ? '-50%, -50%' : '0, 0'}) translate(${elements.icon.x}px, ${elements.icon.y}px)`,
              transition: draggingElement === 'icon' ? 'none' : 'transform 0.1s ease-out',
              padding: isDragMode ? '8px' : '0',
              pointerEvents: isDragMode ? 'auto' : 'none',
              visibility: elements.icon.visible ? 'visible' : 'hidden'
            }}
            onMouseDown={(e) => handleElementDragStart('icon', e)}
          >
            {renderIcon()}
          </div>
        )}
      </div>
    );
  };
  
  // 计算容器尺寸
  const aspectRatio = calculateAspectRatio();
  
  // 监听布局变化并应用
  useEffect(() => {
    if (elementsLayout) {
      setElements(prev => ({
        ...prev,
        title: {
          ...elementsLayout.title,
        },
        author: {
          ...elementsLayout.author,
        },
        icon: {
          ...elementsLayout.icon,
        },
        // 保持图片位置不变
        image: prev.image
      }));
      
      // 保存到历史记录
      saveHistory(elementsLayout);
    }
  }, [elementsLayout]);
  
  // 在组件挂载后自动重置布局
  useEffect(() => {
    // 组件挂载后调用重置布局方法
    handleResetLayout();
    // 仅在组件挂载时执行一次
  }, []);
  
  return (
    <div className="max-h-screen relative flex group rounded-3xl">
      <div
        ref={containerRef}
        style={{ 
          maxHeight: "90vh", 
          minHeight: "50vh",
          overflow: "hidden", 
          position: "relative",
          pointerEvents: "auto",
          width: aspectRatio.width,
          height: aspectRatio.height,
        }}
        className="rounded-md"
        onMouseDown={isDragMode ? handleContainerMouseDown : undefined}
      >
        {/* 背景 */}
        {renderBackground()}
        
        {/* 网格辅助线 */}
        {renderGrid()}
      </div>

      {/* 遮罩和内容层 */}
      <div
        style={{
          backgroundColor: color == "" ? "#1F293799" : color + blurTrans,
          pointerEvents: isDragMode ? 'none' : 'auto',
          zIndex: 1
        }}
        className={`absolute top-0 right-0 left-0 rounded-md h-full ${blur}`}
      >
        {/* 可拖动元素 */}
        {renderDraggableElements()}

        {/* 加载指示器 */}
        {isLoading && <Spinner className="absolute bottom-8 left-8" />}
      </div>

      {/* 图片作者信息 */}
      {backgroundType === 'image' && (
        <div className="absolute bottom-4 right-4 opacity-80">
          <div className="group-hover:flex hidden items-center">
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
      )}
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
