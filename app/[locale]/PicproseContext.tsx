"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { config } from "@/config";
import { SVG_BACKGROUNDS } from "./svgBackgrounds";

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
  customWidth: number;
  customHeight: number;
  isCustomAspect: boolean;
}

// 定义背景类型
type BackgroundType = 'image' | 'color' | 'pattern' | 'svg';

// 修改SvgParams类型定义
interface SvgParams {
  color1: string;
  color2: string;
  backgroundColor: string;
  height?: number;
  amplitude?: number;
  frequency?: number;
  layers?: number;
  speed?: number;
  rotation?: number;
  contrast?: number;
  wavesOpacity?: number;
  style?: string;
  direction?: string;
  useGradientBg?: boolean;
  
  // 角落图案的参数
  cornerRadius?: number;
  cornerCount?: number;
  strokeWidth?: number;
  position?: string[];
  mirrorEdges?: boolean;
  balance?: number;
  velocity?: number;
  layerDistance?: number;
  offsetX?: number;
  offsetY?: number;
  radius?: number;
  shadowColor?: string;
}

// 添加SVG模板参数类型定义
interface SvgTemplateParams {
  [key: string]: any;
}

// 添加SVG模板类型定义
interface SvgTemplate {
  name: string;
  svgTemplate: (params: SvgTemplateParams) => string;
  defaultParams: SvgTemplateParams;
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
  
  // 背景类型和颜色
  backgroundType: BackgroundType;
  setBackgroundType: (type: BackgroundType) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  
  // 新增纹理背景相关属性
  backgroundPattern: string;
  setBackgroundPattern: (pattern: string) => void;
  
  // 添加SVG相关属性
  selectedSvgIndex: number | null;
  setSelectedSvgIndex: (index: number | null) => void;
  svgPatternParams: SvgTemplateParams;
  setSvgPatternParams: (params: SvgTemplateParams) => void;
  showSvgPanel: boolean;
  setShowSvgPanel: (show: boolean) => void;
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
  customWidth: 1920,
  customHeight: 1080,
  isCustomAspect: false,
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
  // 创建默认属性信息
  const initialPropertyInfo = React.useMemo(() => {
    // 使用固定的第一个标题，而不是随机选择
    return {
      ...defaultPropertyInfo,
      title: config.title[0] // 使用固定的第一个标题
    };
  }, []);

  const [imageInfo, setImageInfo] = useState<ImageInfo>(defaultImageInfo);
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo>(initialPropertyInfo);
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('image');
  const [backgroundColor, setBackgroundColor] = useState<string>('#1F2937');
  const [backgroundPattern, setBackgroundPattern] = useState<string>("");
  
  // 添加三种状态下的遮罩浓度
  const [imageBlurTrans, setImageBlurTrans] = useState<string>((Math.floor(2.55 * config.blurTrans)).toString(16));
  const [colorBlurTrans, setColorBlurTrans] = useState<string>("00"); // 颜色模式默认透明
  const [patternBlurTrans, setPatternBlurTrans] = useState<string>("99"); // 纹理模式默认60%浓度 (153/255 ≈ 0.6 = 60%)

  // 新增SVG相关状态
  const [selectedSvgIndex, setSelectedSvgIndex] = useState<number | null>(null);
  const [svgPatternParams, setSvgPatternParams] = useState<SvgTemplateParams>({});
  const [showSvgPanel, setShowSvgPanel] = useState(false);

  // 使用 useEffect 来设置随机标题，这样只会在客户端执行
  useEffect(() => {
    // 仅在客户端执行随机选择
    const randomTitle = config.title[Math.floor(Math.random() * config.title.length)];
    setPropertyInfo(prev => ({
      ...prev,
      title: randomTitle
    }));
  }, []);

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

  // 将这些方法更新为支持多个SVG模板
  const randomizeSvgParams = (index: number) => {
    if (index >= 0 && index < SVG_BACKGROUNDS.length) {
      const svgTemplate = SVG_BACKGROUNDS[index];
      const params = {...svgTemplate.defaultParams};
      
      // 随机参数设置...
      // 这部分已在RightPropertyPanel中实现
      
      setSvgPatternParams(params);
      setSelectedSvgIndex(index);
      
      const svgPattern = svgTemplate.svgTemplate(params);
      const encodedSvg = `url("data:image/svg+xml;utf8,${encodeURIComponent(svgPattern)}")`;
      setBackgroundPattern(encodedSvg);
      setBackgroundType('svg');
    }
  };

  // 只需确保保留Heazy波浪相关的随机生成逻辑
  const randomizeHeazyWave = () => {
    // 确认是Heazy波浪（索引为1）
    const heazyWaveIndex = 1;
    const heazyWave = SVG_BACKGROUNDS[heazyWaveIndex];
    
    // 创建新参数对象，保留默认值结构
    const params = {...heazyWave.defaultParams};
    
    // 随机颜色 - 生成鲜艳的颜色
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = (hue1 + 40 + Math.floor(Math.random() * 140)) % 360;
    
    params.color1 = `hsl(${hue1}, 80%, 60%)`;
    params.color2 = `hsl(${hue2}, 80%, 60%)`;
    
    // 随机设置参数
    params.amplitude = Math.floor(Math.random() * 95) + 10; // 10-105
    params.frequency = (Math.random() * 0.045) + 0.005; // 0.005-0.05
    params.layers = Math.floor(Math.random() * 5) + 1; // 1-5
    params.speed = (Math.random() * 0.8) + 0.1; // 0.1-0.9
    params.rotation = Math.floor(Math.random() * 360 / 15) * 15; // 0-345，每15度一个增量
    params.contrast = Math.floor(Math.random() * 101); // 0-100
    params.wavesOpacity = (Math.random() * 0.6) + 0.3; // 0.3-0.9
    
    // 随机选择方向
    const directions = ['left', 'right', 'none'];
    params.direction = directions[Math.floor(Math.random() * directions.length)];
    
    // 随机选择样式
    params.style = Math.random() > 0.5 ? 'solid' : 'outline';
    
    // 随机选择是否使用渐变背景
    params.useGradientBg = Math.random() > 0.3; // 70%概率使用渐变背景
    
    if (!params.useGradientBg) {
      // 如果不使用渐变，随机生成背景色（深色系）
      const bgHue = Math.floor(Math.random() * 360);
      params.backgroundColor = `hsl(${bgHue}, 70%, 10%)`;
    }
    
    // 更新状态
    setSvgPatternParams(params);
    setSelectedSvgIndex(heazyWaveIndex);
    
    // 生成SVG
    const svgPattern = heazyWave.svgTemplate(params);
    const encodedSvg = `url("data:image/svg+xml;utf8,${encodeURIComponent(svgPattern)}")`;
    setBackgroundPattern(encodedSvg);
    setBackgroundType('svg');
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
        setBackgroundPattern,
        selectedSvgIndex,
        setSelectedSvgIndex,
        svgPatternParams,
        setSvgPatternParams,
        showSvgPanel,
        setShowSvgPanel
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