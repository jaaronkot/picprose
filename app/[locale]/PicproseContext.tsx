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

// 定义背景类型
type BackgroundType = 'image' | 'color' | 'pattern';

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
  
  // 背景类型和颜色
  backgroundType: BackgroundType;
  setBackgroundType: (type: BackgroundType) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  
  // 新增纹理背景相关属性
  backgroundPattern: string;
  setBackgroundPattern: (pattern: string) => void;
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
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('image');
  const [backgroundColor, setBackgroundColor] = useState<string>('#1F2937');
  const [backgroundPattern, setBackgroundPattern] = useState<string>("");
  
  // 添加三种状态下的遮罩浓度
  const [imageBlurTrans, setImageBlurTrans] = useState<string>((Math.floor(2.55 * config.blurTrans)).toString(16));
  const [colorBlurTrans, setColorBlurTrans] = useState<string>("00"); // 颜色模式默认透明
  const [patternBlurTrans, setPatternBlurTrans] = useState<string>("99"); // 纹理模式默认60%浓度 (153/255 ≈ 0.6 = 60%)

  // 更新单个属性
  const updateProperty = <K extends keyof PropertyInfo>(key: K, value: PropertyInfo[K]) => {
    setPropertyInfo(prev => ({
      ...prev,
      [key]: value
    }));
    
    // 如果用户正在更新遮罩透明度，同时根据当前背景类型保存到对应的状态
    if (key === "blurTrans" && typeof value === "string") {
      if (backgroundType === 'image') {
        setImageBlurTrans(value);
      } else if (backgroundType === 'color') {
        setColorBlurTrans(value);
      } else if (backgroundType === 'pattern') {
        setPatternBlurTrans(value);
      }
    }
  };

  // 修改背景类型设置函数，当切换背景类型时，也切换对应的遮罩透明度
  const handleBackgroundTypeChange = (type: BackgroundType) => {
    // 更新背景类型
    setBackgroundType(type);
    
    // 根据新的背景类型应用相应的遮罩透明度
    if (type === 'color') {
      updateProperty("blurTrans", colorBlurTrans);
    } else if (type === 'image') {
      updateProperty("blurTrans", imageBlurTrans);
    } else if (type === 'pattern') {
      updateProperty("blurTrans", patternBlurTrans);
    }
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
        downloadImage,
        backgroundType,
        setBackgroundType: handleBackgroundTypeChange,
        backgroundColor,
        setBackgroundColor,
        backgroundPattern,
        setBackgroundPattern
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