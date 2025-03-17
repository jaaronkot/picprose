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
  // 添加网格步长常量
  const GRID_STEP = 10; // 10像素的步长
  
  // 添加网格线数量状态
  const [gridLines, setGridLines] = React.useState({ horizontal: 0, vertical: 0 });
  
  const { propertyInfo, imageInfo, backgroundType, backgroundColor, backgroundPattern } = usePicprose();
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

  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  React.useEffect(() => {
    if(imageInfo.url) {
      setIsLoading(true);
    }
  }, [imageInfo.url]);

  // 修改图片加载后的垂直居中逻辑
  React.useEffect(() => {
    // 创建一个函数来计算并设置图片居中位置
    const centerImageVertically = () => {
      if (imageRef.current && containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const imageHeight = imageRef.current.clientHeight;
        
        // 即使图片高度小于容器高度，也将其居中显示
        setImagePosition(0); // 默认从顶部开始显示
      }
    };
    
    // 当图片加载完成后设置isLoading为false，并居中图片
    const handleImageLoad = () => {
      setIsLoading(false);
      // 稍微延迟执行居中操作，确保DOM已完全更新
      setTimeout(centerImageVertically, 10);
    };
    
    // 给图片元素添加加载事件监听
    const imgElement = imageRef.current;
    if (imgElement) {
      imgElement.addEventListener('load', handleImageLoad);
    }
    
    return () => {
      // 清理事件监听器
      if (imgElement) {
        imgElement.removeEventListener('load', handleImageLoad);
      }
    };
  }, [imageInfo.url]); // 当图片URL改变时重新执行

  // 辅助函数：将值对齐到网格步长
  const snapToGrid = (value: number): number => {
    return Math.round(value / GRID_STEP) * GRID_STEP;
  };

  // 使用useCallback优化事件处理函数
  const handleImageMouseDown = React.useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    if (!isDragMode) return;
    setIsDragging(true);
    setDragStartY(e.clientY - imagePosition);
    // 不再需要记录水平方向的起始位置
    setDragStart({ 
      x: e.clientX, // 仍然需要记录x，因为其他元素可能需要
      y: e.clientY - imagePosition 
    });
    e.stopPropagation();
  }, [isDragMode, imagePosition]);

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && imageRef.current) {
      // 按步长对齐垂直位置
      const newVerticalPosition = snapToGrid(e.clientY - dragStartY);
      
      const container = containerRef.current;
      const image = imageRef.current;
      
      if (container && image) {
        const containerRect = container.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();
        
        // 确保图片可以在容器内移动的范围
        const imageHeight = imageRect.height;
        const containerHeight = containerRect.height;
        
        let minY, maxY;
        
        // 放宽拖动限制，使图片可以移动更大范围
        if (imageHeight <= containerHeight) {
          // 放宽小图片的移动范围 - 允许移动图片高度的一半
          minY = -imageHeight / 2;
          maxY = containerHeight - imageHeight / 2;
        } else {
          // 放宽大图片的移动范围 - 允许露出图片的一部分
          minY = containerHeight - imageHeight * 1.2; // 允许多露出20%的图片
          maxY = imageHeight * 0.2; // 允许图片顶部部分移动到容器外
        }
        
        // 将最终位置对齐到网格
        const boundedY = snapToGrid(Math.max(minY, Math.min(maxY, newVerticalPosition)));
        
        setImagePosition(boundedY);
        forceUpdate();
      } else {
        setImagePosition(newVerticalPosition);
      }
    }
    
    // 处理其他元素拖动
    if (draggingElement && isDragMode) {
      // 将每个步进对齐到网格
      const deltaX = snapToGrid(e.clientX - dragStart.x);
      const deltaY = snapToGrid(e.clientY - dragStart.y);
      
      if (deltaX !== 0 || deltaY !== 0) { // 只有当变化大于等于一个步长时才更新
        if (draggingElement === 'title' || draggingElement === 'author' || 
            draggingElement === 'icon' || draggingElement === 'image') {
          handleElementDragImpl(draggingElement, deltaX, deltaY);
        }
        
        setDragStart({ x: e.clientX, y: e.clientY });
      }
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

  // 修改元素拖动实现函数
  const handleElementDragImpl = (elementKey: 'title' | 'author' | 'icon' | 'image', deltaX: number, deltaY: number) => {
    setElements(prev => {
      const newElements = {...prev};
      if (elementKey === 'title') {
        newElements.title = {
          ...newElements.title,
          x: snapToGrid(newElements.title.x + deltaX),
          y: snapToGrid(newElements.title.y + deltaY)
        };
      } else if (elementKey === 'author') {
        newElements.author = {
          ...newElements.author,
          x: snapToGrid(newElements.author.x + deltaX),
          y: snapToGrid(newElements.author.y + deltaY)
        };
      } else if (elementKey === 'icon') {
        newElements.icon = {
          ...newElements.icon,
          x: snapToGrid(newElements.icon.x + deltaX),
          y: snapToGrid(newElements.icon.y + deltaY)
        };
      } else if (elementKey === 'image') {
        newElements.image = {
          ...newElements.image,
          x: snapToGrid(newElements.image.x + deltaX),
          y: snapToGrid(newElements.image.y + deltaY)
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

  // 添加一个处理容器级别鼠标事件的函数
  const handleContainerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragMode) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const isClickOnDraggableElement = e.target !== containerRef.current;
      
      if (!isClickOnDraggableElement) {
        // 触发图片拖动逻辑，但只考虑垂直方向
        setIsDragging(true);
        setDragStartY(e.clientY - imagePosition);
        setDragStart({ 
          x: e.clientX, // 仍然记录x坐标用于其他元素
          y: e.clientY - imagePosition 
        });
      }
    }
  };

  // 添加一个useEffect来计算网格线数量
  React.useEffect(() => {
    if (containerRef.current && isDragMode) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      // 限制最大线条数量，防止性能问题
      const MAX_LINES = 1000;
      
      // 确保计算出的线条数量是有效的、安全的值
      const horizontalLines = Math.min(Math.max(Math.floor(height / GRID_STEP), 0), MAX_LINES);
      const verticalLines = Math.min(Math.max(Math.floor(width / GRID_STEP), 0), MAX_LINES);
      
      setGridLines({ horizontal: horizontalLines, vertical: verticalLines });
    }
  }, [isDragMode, containerRef.current?.clientWidth, containerRef.current?.clientHeight]);

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
          width: (() => {
            // 对空值或无效值进行处理
            if (!aspect || !aspect.includes('/')) {
              return '90vh'; // 无效比例时默认为90vh
            }
            
            try {
              const ratioStr = aspect.replace('aspect-[', '').replace(']', '');
              const [w, h] = ratioStr.split('/').map(n => parseFloat(n.trim()));
              
              // 检查是否为有效数字
              if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
                return '90vh';
              }
              
              // 1:1比例或接近1:1的比例
              if (Math.abs(w - h) < 0.01) {
                return '90vh';
              } else if (h > w) {
                // 竖屏比例
                return `${90 * w / h}vh`;
              } else {
                // 横屏比例
                return '90vh';
              }
            } catch (e) {
              return '90vh';
            }
          })(),
          height: (() => {
            // 对空值或无效值进行处理
            if (!aspect || !aspect.includes('/')) {
              return '90vh'; // 无效比例时默认为90vh  
            }
            
            try {
              const ratioStr = aspect.replace('aspect-[', '').replace(']', '');
              const [w, h] = ratioStr.split('/').map(n => parseFloat(n.trim()));
              
              // 检查是否为有效数字
              if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
                return '90vh';
              }
              
              // 1:1比例或接近1:1的比例
              if (Math.abs(w - h) < 0.01) {
                return '90vh';
              } else if (w > h) {
                // 横屏比例
                return `${90 * h / w}vh`;
              } else {
                // 竖屏比例
                return '90vh';
              }
            } catch (e) {
              return '90vh';
            }
          })(),
        }}
        className="rounded-md"
        onMouseDown={isDragMode ? handleContainerMouseDown : undefined}
      >
        {/* 根据背景类型渲染不同背景 */}
        {backgroundType === 'image' ? (
          <img
            ref={imageRef}
            src={imageInfo.url}
            alt="Image"
            className={`rounded-md ${isDragMode ? 'cursor-move' : ''}`}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: `50% ${imagePosition}px`,
              transition: isDragging ? 'none' : 'all 0.1s ease-out',
            }}
            onMouseDown={handleImageMouseDown}
            draggable={false}
          />
        ) : backgroundType === 'color' ? (
          <div
            className="rounded-md w-full h-full"
            style={{ 
              background: backgroundColor,
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        ) : backgroundType === 'pattern' ? (
          <div
            className="rounded-md w-full h-full"
            style={{ 
              background: backgroundPattern.split('|')[0], // 提取纹理部分
              backgroundColor: backgroundPattern.split('|')[1] || '#ffffff', // 提取背景色部分，默认为白色
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        ) : backgroundType === 'svg' ? (
          <div
            className="rounded-md w-full h-full"
            style={{ 
              backgroundImage: backgroundPattern, // SVG背景是作为URL存储的
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ) : null}

        {/* 增强版网格辅助线 - 10像素步长 */}
        {isDragMode && (
          <>
            {/* 主网格 - 大区域分隔 */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="border border-white/20"></div>
              ))}
            </div>
            
            {/* 细网格 - 10像素对齐辅助线 */}
            <div className="absolute inset-0 pointer-events-none">
              {/* 横向线条 - 使用安全计算的网格线数量 */}
              {Array.from({ length: gridLines.horizontal }).map((_, i) => (
                <div 
                  key={`h-${i}`} 
                  className="absolute left-0 right-0 border-t border-white/10"
                  style={{ top: `${i * GRID_STEP}px`, height: '1px' }}
                ></div>
              ))}
              
              {/* 纵向线条 - 使用安全计算的网格线数量 */}
              {Array.from({ length: gridLines.vertical }).map((_, i) => (
                <div 
                  key={`v-${i}`} 
                  className="absolute top-0 bottom-0 border-l border-white/10" 
                  style={{ left: `${i * GRID_STEP}px`, width: '1px' }}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 内容覆盖层 */}
      <div
        style={{
          backgroundColor: color == "" ? "#1F293799" : color + blurTrans,
          pointerEvents: isDragMode ? 'none' : 'auto',
          zIndex: 1
        }}
        className={"absolute top-0 right-0 left-0 rounded-md h-full " + blur}
      >
        {/* 使用统一的绝对定位容器 - 修改这里的pointerEvents逻辑 */}
        <div className="absolute inset-0" style={{ 
          pointerEvents: isDragMode ? 'none' : 'none',
          // 只有元素本身需要拦截事件，不要让容器拦截所有事件
        }}>
          {/* 然后在各个可拖动元素上单独设置pointerEvents */}
          <div 
            className={`absolute ${isDragMode ? 'cursor-move border border-dashed border-white/30' : ''}`}
            style={{ 
              left: '50%',
              top: '40%',
              transform: `translate(-50%, -50%) translate(${elements.title.x}px, ${elements.title.y}px)`,
              transition: draggingElement === 'title' ? 'none' : 'transform 0.1s ease-out',
              padding: isDragMode ? '8px' : '0',
              pointerEvents: isDragMode ? 'auto' : 'none', // 只有在拖动模式时才拦截事件
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
              pointerEvents: isDragMode ? 'auto' : 'none', // 只有在拖动模式时才拦截事件
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
              pointerEvents: isDragMode ? 'auto' : 'none', // 只有在拖动模式时才拦截事件
            }}
            onMouseDown={(e) => handleElementDragStart('icon', e)}
          >
            {renderIcon()}
          </div>
        </div>

        {isLoading && <Spinner className={"absolute bottom-8 left-8"} />}
      </div>

      {/* 仅在使用图片背景时显示图片作者信息 */}
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
