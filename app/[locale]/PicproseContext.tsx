"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { config } from "@/config";

// 定义图片信息接口
interface ImageInfo {
  url: string;
  name: string;
  avatar: string;
  profile: string;
  downloadLink: string;
  width?: number;
  height?: number;
  key?: string;
  alt?: string;
  src?: string;
}

// 定义属性接口
interface PropertyInfo {
  font: string;
  fontSizeValue: number | string;
  authorFontSizeValue: number | string;
  title: string;
  subTitle: string;
  author: string;
  icon: string;
  devicon: string;
  color: string;
  aspect: string;
  blur: string;
  blurTrans: string;
  logoPosition: string;
}

// 定义Context的类型
interface PicproseContextType {
  // 图片信息
  imageInfo: ImageInfo;
  setImageInfo: (info: ImageInfo) => void;
  
  // 属性信息
  propertyInfo: PropertyInfo;
  updateProperty: <K extends keyof PropertyInfo>(key: K, value: PropertyInfo[K]) => void;
  
  // 下载图片
  downloadImage: (format: string) => void;
}

// 创建默认图片信息
const defaultImageInfo: ImageInfo = {
  url: "stacked-waves.svg",
  name: "PicProse",
  avatar: "default-author.jpg",
  profile: "default",
  downloadLink: "",
};

// 创建默认属性信息
const defaultPropertyInfo: PropertyInfo = {
  font: config.font,
  fontSizeValue: config.fontSize,
  authorFontSizeValue: config.authorFontSize,
  title: config.title[Math.floor(Math.random() * 4)],
  subTitle: config.subTitle,
  author: config.author,
  icon: config.icon,
  devicon: config.deviconValue[0] || "",
  color: config.backColor,
  aspect: config.aspect,
  blur: "backdrop-blur-none",
  blurTrans: (Math.floor(2.55 * config.blurTrans)).toString(16),
  logoPosition: config.logoPosition,
};

// 创建Context
const PicproseContext = createContext<PicproseContextType | undefined>(undefined);

// Context Provider组件
export function PicproseProvider({ 
  children, 
  onDownload 
}: { 
  children: React.ReactNode, 
  onDownload: (format: string) => void 
}) {
  const [imageInfo, setImageInfo] = useState<ImageInfo>(defaultImageInfo);
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo>(defaultPropertyInfo);

  // 更新单个属性
  const updateProperty = <K extends keyof PropertyInfo>(key: K, value: PropertyInfo[K]) => {
    setPropertyInfo(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 处理模糊属性特殊逻辑
  useEffect(() => {
    let blurLevel: string = "backdrop-blur-none";
    if (typeof propertyInfo.blur === "number") {
      const blurValue = propertyInfo.blur as number;
      if (blurValue == 0) {
        blurLevel = "backdrop-blur-none";
      } else if (blurValue == 20) {
        blurLevel = "backdrop-blur-sm";
      } else if (blurValue == 40) {
        blurLevel = "backdrop-blur";
      } else if (blurValue == 60) {
        blurLevel = "backdrop-blur-md";
      } else if (blurValue == 80) {
        blurLevel = "backdrop-blur-lg";
      } else if (blurValue == 100) {
        blurLevel = "backdrop-blur-xl";
      }
      updateProperty("blur", blurLevel);
    }
  }, [propertyInfo.blur]);

  // 处理透明度
  useEffect(() => {
    if (typeof propertyInfo.blurTrans === "number") {
      const trans = Math.floor(2.55 * propertyInfo.blurTrans as number).toString(16);
      updateProperty("blurTrans", trans);
    }
  }, [propertyInfo.blurTrans]);

  // 下载图片
  const downloadImage = (format: string) => {
    if (onDownload) {
      onDownload(format);
    }
  };

  return (
    <PicproseContext.Provider 
      value={{ 
        imageInfo, 
        setImageInfo, 
        propertyInfo, 
        updateProperty,
        downloadImage
      }}
    >
      {children}
    </PicproseContext.Provider>
  );
}

// 自定义Hook，用于访问Context
export function usePicprose() {
  const context = useContext(PicproseContext);
  if (context === undefined) {
    throw new Error("usePicprose must be used within a PicproseProvider");
  }
  return context;
} 