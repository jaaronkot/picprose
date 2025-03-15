"use client";
import React from "react";
import "./devicon.min.css";
import {
  Spinner,
} from "@nextui-org/react";
import { usePicprose } from "./PicproseContext";

export const ImageEditor = () => {
  const { propertyInfo, imageInfo } = usePicprose();
  const [isLoading, setIsLoading] = React.useState(false);
  const [imagePosition, setImagePosition] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStartY, setDragStartY] = React.useState(0);
  const [isDragMode, setIsDragMode] = React.useState(false);
  const imageRef = React.useRef<HTMLImageElement>(null);
  
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

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isDragMode) return;
    setIsDragging(true);
    setDragStartY(e.clientY - imagePosition);
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && imageRef.current) {
      const newPosition = e.clientY - dragStartY;
      setImagePosition(newPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
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
  }, [isDragging, dragStartY]);

  const renderIcon = () => {
    if (devicon.length !== 0) {
      return (
        <div className="m-4 items-center justify-center flex">
          <i className={`devicon-${devicon} text-white dev-icon text-4xl`}></i>
        </div>
      );
    } else if (icon.length > 0) {
      return (
        <div className=" ">
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
        style={{ maxHeight: "90vh", overflow: "hidden", position: "relative" }}
        className={aspect == "" ? "aspect-[16/9]" : aspect}
      >
        <img
          ref={imageRef}
          src={imageInfo.url}
          alt="Image"
          className={`rounded-md object-cover h-full w-full ${isDragMode ? 'cursor-move' : ''}`}
          style={{ 
            transform: `translateY(${imagePosition}px)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
          onLoad={() => setIsLoading(false)}
          onMouseDown={handleMouseDown}
          draggable={false}
        />

        <button 
          className="absolute bottom-4 left-4 bg-white/70 hover:bg-white/90 text-black p-2 rounded-full z-10 group-hover:flex hidden items-center justify-center"
          onClick={() => setIsDragMode(!isDragMode)}
          title={isDragMode ? "退出调整图片位置模式" : "调整图片位置"}
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {isDragMode ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" 
              />
            )}
          </svg>
        </button>
        
        {isDragMode && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
            <div className="bg-white/80 text-black px-4 py-2 rounded-lg">
              上下拖动图片调整位置
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          backgroundColor: color == "" ? "#1F293799" : color + blurTrans,
          pointerEvents: isDragMode ? 'none' : 'auto'
        }}
        className={"absolute top-0 right-0 left-0 rounded-md h-full " + blur}
      >
        <button className="absolute  top-2 right-2 cursor-pointer">
          <svg
            className="group-hover:inline-block hidden w-8 h-8 text-gray-800 bg-white p-2 rounded-full z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"
            />
          </svg>
        </button>
        <div className="flex justify-center items-center h-full w-full">
          <div>
            <div
              className={"px-10 text-left rounded-xl h-full p-4 flex flex-col"}
            >
              <h1
                className={
                  " leading-tight text-center text-5xl font-bold  text-white " +
                  font
                }
                style={{ fontSize: `${fontSizeValue}px` }}
              >
                {title}
              </h1>
              <div className="flex flex-col items-center pt-10  ">
                <h2
                  className={
                    "text-xl font-semibold text-left text-white " + font
                  }
                  style={{ fontSize: `${authorFontSizeValue}px` }}
                >
                  {author}
                </h2>
                {logoPosition == "default" && renderIcon()}
              </div>
            </div>
          </div>
        </div>
        <div className={"absolute " + logoPosition}>
          {logoPosition != "default" && renderIcon()}
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
