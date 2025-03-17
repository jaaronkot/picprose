"use client";
import React from "react";
import {
  Tabs,
  Tab,
  Select,
  SelectItem,
  SliderValue,
  Selection,
  SelectSection,
  Input,
  Divider,
  Slider,
  Accordion,
  AccordionItem,
  Card,
  Listbox,
  CardBody,
  ListboxItem,
  Textarea,
  ScrollShadow,
  Avatar,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Switch,
  CheckboxIcon,
} from "@nextui-org/react";
import { TwitterPicker, CirclePicker } from "react-color";
import { deviconList } from "./devicon";
import { TopLeftIcon } from "./icons/TopLeftIcon";
import { BottomLeftIcon } from "./icons/BottomLeftIcon";
import { MiddleIcon } from "./icons/MiddleIcon";
import { BottomRightIcon } from "./icons/BottomRightIcon";
import { TopRightIcon } from "./icons/TopRightIcon";
import { config } from "@/config";
import { useTranslations } from "next-intl";
import { usePicprose } from "./PicproseContext";
import { SVG_BACKGROUNDS } from './svgBackgrounds';

const ChevronLeftIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
  >
    <path 
      d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z" 
      fill="currentColor"
    />
  </svg>
);

export const RightPropertyPanel = () => {
  const t = useTranslations("RightPropertyPanel");
  const { 
    propertyInfo, 
    updateProperty, 
    downloadImage,
    selectedSvgIndex,
    svgPatternParams,
    setSvgPatternParams,
    setBackgroundPattern,
    setBackgroundType,
    showSvgPanel,
    setShowSvgPanel
  } = usePicprose();
  
  const titleOptions = config.title;
  const iconInputRef = React.useRef<HTMLInputElement>(null);
  const fontInputRef = React.useRef<HTMLInputElement>(null);
  const [showDimensionsModal, setShowDimensionsModal] = React.useState(false);

  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      updateProperty("icon", file);
      updateProperty("devicon", "");
    }
  };

  const loadFont = (fontName: string, fontUrl: string) => {
    const font = new FontFace(fontName, `url(${fontUrl})`);
    font
      .load()
      .then(() => {
        document.fonts.add(font);
        document.documentElement.style.setProperty("--font-custom", fontName);
      })
      .catch((error) => {
        console.error("Font loading failed:", error);
      });
  };

  const handleFontUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      loadFont("--font-custom", file);
      updateProperty("font", "font-custom");
    }
  };

  const handleAspectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateProperty("aspect", e.target.value);
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateProperty("font", e.target.value);
  };

  const handleColorChange = (color: any) => {
    updateProperty("color", color.hex.toUpperCase());
  };

  const handleBlurLevelChange = (level: any) => {
    updateProperty("blur", level);
  };

  const handleDeviconChange = (selection: Selection) => {
    let icon = "";
    if (selection && typeof selection !== "string" && selection.size > 0) {
      icon = Array.from(selection)[0].toString();
    }
    updateProperty("devicon", icon);
  };

  const handleBlurTransChange = (value: SliderValue) => {
    updateProperty("blurTrans", typeof value === "number" ? value.toString() : value[0].toString());
  };

  const handleIconButtonClick = () => {
    if (iconInputRef.current) {
      iconInputRef.current.click();
    }
  };

  const handleFontButtonClick = () => {
    if (fontInputRef.current) {
      fontInputRef.current.click();
    }
  };

  const colorBackgroundStyle = {
    fontSize: "20px",
    backgroundColor: propertyInfo.color,
    borderWidth: "6px",
    borderColor: "#E9E9EB",
  };

  const handleImageDownload = (format: string) => {
    downloadImage(format);
  };

  const horizontalAspectOptions = [
    { label: "1 : 1", value: "aspect-square", description: "1185 × 1185" },
    { label: "2 : 1", value: "aspect-[2/1]", description: "1185 × 593" },
    { label: "3 : 2", value: "aspect-[3/2]", description: "1185 × 790" },
    { label: "4 : 3", value: "aspect-[4/3]", description: "1185 × 889" },
    { label: "16: 9", value: "aspect-[16/9]", description: "1185 × 667" },
  ];

  const verticalAspectOptions = [
    { label: "1:2", value: "aspect-[1/2]", description: "593 × 1185" },
    { label: "2:3", value: "aspect-[2/3]", description: "790 × 1185" },
    { label: "3:4", value: "aspect-[3/4]", description: "889 × 1185" },
    { label: "9:16", value: "aspect-[9/16]", description: "667 × 1185" },
  ];

  const fontOptions = [
    {
      label: "Font-DingTalk",
      value: "font-dingtalk",
      description: "The largest land animal",
    },
    {
      label: "Font-Alibaba",
      value: "font-alibaba",
      description: "The largest land animal",
    },
    {
      label: "Font-OpenSans",
      value: "font-opensans",
      description: "The largest land animal",
    },
    {
      label: "Font-Anke",
      value: "font-anke",
      description: "The second most popular pet in the world",
    },
    {
      label: "Font-Roboto",
      value: "font-roboto-mono",
      description: "The most popular pet in the world",
    },
    {
      label: "Font-KingSoft",
      value: "font-kingsoft",
      description: "The largest land animal",
    },
    {
      label: "Font-XinYiGuanHei",
      value: "font-xinyiguanhei",
      description: "The largest land animal",
    },
  ];

  const handleCustomWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(e.target.value) || 1920;
    updateProperty("customWidth", width);
    if (propertyInfo.isCustomAspect) {
      const height = propertyInfo.customHeight || 1080;
      updateProperty("aspect", `aspect-[${width}/${height}]`);
    }
  };

  const handleCustomHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(e.target.value) || 1080;
    updateProperty("customHeight", height);
    if (propertyInfo.isCustomAspect) {
      const width = propertyInfo.customWidth || 1920;
      updateProperty("aspect", `aspect-[${width}/${height}]`);
    }
  };

  const toggleCustomAspect = () => {
    const newIsCustom = !propertyInfo.isCustomAspect;
    updateProperty("isCustomAspect", newIsCustom);
    
    if (newIsCustom) {
      const width = propertyInfo.customWidth || 1920;
      const height = propertyInfo.customHeight || 1080;
      updateProperty("aspect", `aspect-[${width}/${height}]`);
    }
  };

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const formatAspectRatio = (width: number, height: number): string => {
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  };

  const getCurrentDimensionsText = () => {
    if (propertyInfo.isCustomAspect) {
      return {
        ratio: formatAspectRatio(propertyInfo.customWidth || 1920, propertyInfo.customHeight || 1080),
        dimensions: `${propertyInfo.customWidth || 1920} × ${propertyInfo.customHeight || 1080}`
      };
    }
    
    const allOptions = [...horizontalAspectOptions, ...verticalAspectOptions];
    const selectedOption = allOptions.find(option => option.value === propertyInfo.aspect);
    
    if (selectedOption) {
      return {
        ratio: selectedOption.label,
        dimensions: selectedOption.description
      };
    }
    
    return {
      ratio: "16:9",
      dimensions: "1920 × 1080"
    };
  };

  const handleSvgParamChange = (param: string, value: any) => {
    if (selectedSvgIndex === null) return;
    
    // 创建新参数对象
    const currentSvg = SVG_BACKGROUNDS[selectedSvgIndex];
    const newParams = {
      ...currentSvg.defaultParams, // 确保有默认值
      ...svgPatternParams, // 当前值
      [param]: value // 新值
    };
    
    // 更新参数状态
    setSvgPatternParams(newParams);
    
    // 生成新的SVG模板
    const svgPattern = currentSvg.svgTemplate(newParams);
    const encodedSvg = `url("data:image/svg+xml;utf8,${encodeURIComponent(svgPattern)}")`;
    
    // 更新背景
    setBackgroundType('svg');
    setBackgroundPattern(encodedSvg);
  };
  
  const randomizeSvgParams = () => {
    if (selectedSvgIndex === null) return;
    
    // 基于默认参数创建新参数集
    const currentSvg = SVG_BACKGROUNDS[selectedSvgIndex];
    const params = {...currentSvg.defaultParams};
    
    // 随机颜色
    params.color1 = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    params.color2 = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    
    // 如果有背景色
    if (params.backgroundColor) {
      params.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    }
    
    // 随机设置高度
    params.height = Math.floor(Math.random() * 400) + 200; // 200-600之间
    
    // 根据不同的SVG类型设置特定参数
    switch (currentSvg.name) {
      case "波浪":
        params.complexity = (Math.random() * 9) + 1; // 1-10之间
        break;
        
      case "气泡":
        params.bubbleCount = Math.floor(Math.random() * 25) + 5; // 5-30之间
        params.maxRadius = Math.floor(Math.random() * 150) + 50; // 50-200之间
        break;
        
      case "角落":
        params.cornerRadius = Math.floor(Math.random() * 350) + 50; // 50-400之间
        params.cornerCount = Math.floor(Math.random() * 10) + 2; // 2-12之间
        params.strokeWidth = Math.floor(Math.random() * 45) + 5; // 5-50之间
        params.rotation = Math.floor(Math.random() * 360); // 0-360度旋转
        break;
        
      case "标记":
        params.markerCount = Math.floor(Math.random() * 16) + 4; // 4-20之间
        params.markerHeight = Math.floor(Math.random() * 250) + 50; // 50-300之间
        break;
        
      case "等值线":
        params.lineCount = Math.floor(Math.random() * 16) + 4; // 4-20之间
        params.amplitude = Math.floor(Math.random() * 45) + 5; // 5-50之间
        params.noiseScale = (Math.random() * 0.049) + 0.001; // 0.001-0.05之间
        break;

      case "波浪":
        params.amplitude = Math.floor(Math.random() * 95) + 5; // 5-100之间
        params.frequency = (Math.random() * 0.045) + 0.005; // 0.005-0.05之间
        params.layers = Math.floor(Math.random() * 8) + 1; // 1-8之间
        params.speed = (Math.random() * 0.95) + 0.05; // 0.05-1之间
        params.rotation = Math.floor(Math.random() * 360); // 0-360度旋转
        params.contrast = Math.floor(Math.random() * 101); // 0-100之间
        params.wavesOpacity = (Math.random() * 0.9) + 0.1; // 0.1-1之间
        break;
    }
    
    // 更新状态
    setSvgPatternParams(params);
    
    // 生成SVG
    const svgPattern = currentSvg.svgTemplate(params);
    const encodedSvg = `url("data:image/svg+xml;utf8,${encodeURIComponent(svgPattern)}")`;
    setBackgroundPattern(encodedSvg);
    setBackgroundType('svg');
  };

  const randomizeHeazyWave = () => {
    if (selectedSvgIndex === null) return;
    
    // 确认是Heazy波浪
    const currentSvg = SVG_BACKGROUNDS[selectedSvgIndex];
    if (currentSvg.name !== "波浪") return;
    
    // 创建新参数对象，保留默认值结构
    const params = {...currentSvg.defaultParams};
    
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
    
    // 生成SVG
    const svgPattern = currentSvg.svgTemplate(params);
    const encodedSvg = `url("data:image/svg+xml;utf8,${encodeURIComponent(svgPattern)}")`;
    setBackgroundPattern(encodedSvg);
    setBackgroundType('svg');
  };

  const renderSvgControls = () => {
    if (selectedSvgIndex === null || !SVG_BACKGROUNDS[selectedSvgIndex]) {
      return null;
    }

    const currentSvg = SVG_BACKGROUNDS[selectedSvgIndex];
    const params = svgPatternParams;

    let specificControls;
    // 只保留Heazy波浪的控制项
    specificControls = (
      <>
        {/* 顶部切换按钮 - Solid/Outline */}
        <div className="w-full mb-6 rounded-xl overflow-hidden bg-default-100">
          <div className="flex">
            <div 
              className={`w-1/2 flex items-center justify-center py-4 ${params?.style === 'solid' || !params?.style ? 'bg-default-200' : ''}`}
              onClick={() => handleSvgParamChange('style', 'solid')}
            >
              <svg className="w-5 h-5 mr-2 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h18v18H3z" />
              </svg>
              <span className="text-foreground">{t("solid")}</span>
            </div>
            <div 
              className={`w-1/2 flex items-center justify-center py-4 ${params?.style === 'outline' ? 'bg-default-200' : ''}`}
              onClick={() => handleSvgParamChange('style', 'outline')}
            >
              <svg className="w-5 h-5 mr-2 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 3h18v18H3z" strokeWidth="2" />
              </svg>
              <span className="text-foreground">Outline</span>
            </div>
          </div>
        </div>

        {/* SHAPE 部分 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-5 text-foreground">{t("shape")}</h3>
          
          {/* Amplitude 振幅控制 */}
          <div className="mb-5">
            <div className="flex justify-between text-default-600 mb-2">
              <span>{t("amplitude")}</span>
              <span>{params?.amplitude || currentSvg.defaultParams.amplitude}</span>
            </div>
            <div className="flex items-center">
              <div className="rounded-full w-10 h-10 bg-default-200 flex items-center justify-center mr-2">
                <svg className="w-6 h-6 text-default-600" fill="none" viewBox="0 0 24 24">
                  <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" stroke="currentColor" />
                </svg>
              </div>
              <input 
                type="range" 
                min={5} 
                max={150}
                step={5}
                value={params?.amplitude || currentSvg.defaultParams.amplitude} 
                onChange={(e) => handleSvgParamChange('amplitude', parseFloat(e.target.value))}
                className="flex-1 h-1 bg-default-300 rounded-lg appearance-none cursor-pointer mx-2"
              />
              <div className="rounded-full w-10 h-10 bg-default-200 flex items-center justify-center ml-2">
                <svg className="w-6 h-6 text-default-600" fill="none" viewBox="0 0 24 24">
                  <path d="M8 6C8 6 12 10 12 12C12 14 8 18 8 18M16 6C16 6 12 10 12 12C12 14 16 18 16 18" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Frequency 频率控制 */}
          <div className="mb-5">
            <div className="flex justify-between text-default-600 mb-2">
              <span>{t("frequency")}</span>
              <span>{params?.frequency || currentSvg.defaultParams.frequency}</span>
            </div>
            <div className="flex items-center">
              <div className="rounded-full w-10 h-10 bg-default-200 flex items-center justify-center mr-2">
                <svg className="w-6 h-6 text-default-600" fill="none" viewBox="0 0 24 24">
                  <path d="M3 18C3 18 7 10 12 10M12 10C17 10 21 18 21 18M12 10V22" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <input 
                type="range" 
                min={0.005} 
                max={0.05}
                step={0.001}
                value={params?.frequency || currentSvg.defaultParams.frequency} 
                onChange={(e) => handleSvgParamChange('frequency', parseFloat(e.target.value))}
                className="flex-1 h-1 bg-default-300 rounded-lg appearance-none cursor-pointer mx-2"
              />
              <div className="rounded-full w-10 h-10 bg-default-200 flex items-center justify-center ml-2">
                <svg className="w-6 h-6 text-default-600" fill="none" viewBox="0 0 24 24">
                  <path d="M3 12C3 12 6 6 9 6C12 6 12 18 15 18C18 18 21 12 21 12" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Speed 速度控制 */}
          <div className="mb-5">
            <div className="flex justify-between text-default-600 mb-2">
              <span>{t("speed")}</span>
              <span>{params?.speed || currentSvg.defaultParams.speed}</span>
            </div>
            <div className="flex items-center">
              <div className="rounded-full w-10 h-10 bg-default-200 flex items-center justify-center mr-2">
                <svg className="w-6 h-6 text-default-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 12H4M4 12L10 6M4 12L10 18" strokeWidth="2" />
                </svg>
              </div>
              <input 
                type="range" 
                min={0.05} 
                max={1}
                step={0.05}
                value={params?.speed || currentSvg.defaultParams.speed} 
                onChange={(e) => handleSvgParamChange('speed', parseFloat(e.target.value))}
                className="flex-1 h-1 bg-default-300 rounded-lg appearance-none cursor-pointer mx-2"
              />
              <div className="rounded-full w-10 h-10 bg-default-200 flex items-center justify-center ml-2">
                <svg className="w-6 h-6 text-default-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 12H20M20 12L14 6M20 12L14 18" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Direction 方向控制 */}
          <div className="mb-5">
            <div className="text-default-600 mb-2">{t("direction")}</div>
            <div className="grid grid-cols-3 gap-2">
              <button 
                className={`p-3 flex items-center justify-center ${params?.direction === 'left' ? 'bg-primary-100 text-primary-600' : 'bg-default-100'} rounded-lg`}
                onClick={() => handleSvgParamChange('direction', 'left')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeWidth="2" />
                </svg>
                <span className="ml-2">{t("left")}</span>
              </button>
              <button 
                className={`p-3 flex items-center justify-center ${params?.direction === 'right' || !params?.direction ? 'bg-primary-100 text-primary-600' : 'bg-default-100'} rounded-lg`}
                onClick={() => handleSvgParamChange('direction', 'right')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeWidth="2" />
                </svg>
                <span className="ml-2">{t("right")}</span>
              </button>
              <button 
                className={`p-3 flex items-center justify-center ${params?.direction === 'none' ? 'bg-primary-100 text-primary-600' : 'bg-default-100'} rounded-lg`}
                onClick={() => handleSvgParamChange('direction', 'none')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M6 12H18M12 6V18" strokeWidth="2" />
                </svg>
                <span className="ml-2">{t("none")}</span>
              </button>
            </div>
          </div>

          {/* Rotation 旋转控制 */}
          <div className="mb-5">
            <div className="flex justify-between text-default-600 mb-2">
              <span>{t("rotation")}</span>
              <span>{params?.rotation || currentSvg.defaultParams.rotation}°</span>
            </div>
            <div className="flex items-center">
              <div className="rounded-full w-10 h-10 bg-default-200 flex items-center justify-center mr-2">
                <svg className="w-6 h-6 text-default-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14.5 10c.5.667 1.5 2 1.5 2M19 6c0 0-3-3-7-3S5 6 5 6" strokeWidth="2" />
                  <path d="M9.5 14c-.5-.667-1.5-2-1.5-2M5 18c0 0 3 3 7 3s7-3 7-3" strokeWidth="2" />
                  <path d="M12 3v6m4.5 1L12 9l1.5 4.5" strokeWidth="2" />
                </svg>
              </div>
              <input 
                type="range" 
                min={0} 
                max={360}
                step={15}
                value={params?.rotation || currentSvg.defaultParams.rotation} 
                onChange={(e) => handleSvgParamChange('rotation', parseInt(e.target.value))}
                className="flex-1 h-1 bg-default-300 rounded-lg appearance-none cursor-pointer mx-2"
              />
              <div className="rounded-full w-10 h-10 bg-default-200 flex items-center justify-center ml-2">
                <svg className="w-6 h-6 text-default-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 3v6M15 12h6M12 21v-6M3 12h6" strokeWidth="2" />
                  <path d="M12 12h.01" strokeWidth="3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Layers 控制 - 使用数字输入框 */}
          <div className="mb-5">
            <div className="flex justify-between text-default-600 mb-2">
              <span>{t("layers")}</span>
              <span>{params?.layers || currentSvg.defaultParams.layers}</span>
            </div>
            <div className="relative">
              <input 
                type="number" 
                min={1} 
                max={8}
                value={params?.layers || currentSvg.defaultParams.layers} 
                onChange={(e) => handleSvgParamChange('layers', parseInt(e.target.value))}
                className="w-full bg-default-100 text-foreground py-3 px-4 rounded-lg appearance-none"
              />
              <div className="absolute right-0 top-0 bottom-0 flex flex-col pr-2">
                <button 
                  className="flex-1 focus:outline-none text-default-500 hover:text-default-700"
                  onClick={() => {
                    const newValue = Math.min((params?.layers || currentSvg.defaultParams.layers) + 1, 8);
                    handleSvgParamChange('layers', newValue);
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5z" />
                  </svg>
                </button>
                <button 
                  className="flex-1 focus:outline-none text-default-500 hover:text-default-700"
                  onClick={() => {
                    const newValue = Math.max((params?.layers || currentSvg.defaultParams.layers) - 1, 1);
                    handleSvgParamChange('layers', newValue);
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Layer Opacity 控制 */}
          <div className="mb-5">
            <div className="flex justify-between text-default-600 mb-2">
              <span>{t("layer_opacity")}</span>
              <span>{params?.wavesOpacity || currentSvg.defaultParams.wavesOpacity}</span>
            </div>
            <div className="flex items-center">
              <div className="rounded-full w-10 h-10 bg-default-200 flex items-center justify-center mr-2">
                <svg className="w-6 h-6 text-default-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeOpacity="0.3" />
                </svg>
              </div>
              <input 
                type="range" 
                min={0.1} 
                max={1}
                step={0.05}
                value={params?.wavesOpacity || currentSvg.defaultParams.wavesOpacity} 
                onChange={(e) => handleSvgParamChange('wavesOpacity', parseFloat(e.target.value))}
                className="flex-1 h-1 bg-default-300 rounded-lg appearance-none cursor-pointer mx-2"
              />
              <div className="rounded-full w-10 h-10 bg-default-200 flex items-center justify-center ml-2">
                <svg className="w-6 h-6 text-default-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* COLORS 部分 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-5 text-foreground">{t("colors")}</h3>
          
          {/* 颜色选择器 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-default-600 mb-2">{t("start_color")}</div>
              <div className="relative">
                <Dropdown>
                  <DropdownTrigger>
                    <div className="flex items-center cursor-pointer">
                      <div 
                        className="w-10 h-10 rounded-lg border-2 border-default-300"
                        style={{ backgroundColor: params?.color1 || currentSvg.defaultParams.color1 }}
                      ></div>
                      <div className="flex-1 ml-2 bg-default-100 text-foreground rounded-lg px-3 py-2">
                        {(params?.color1 || currentSvg.defaultParams.color1).toUpperCase()}
                      </div>
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>
                      <TwitterPicker 
                        color={params?.color1 || currentSvg.defaultParams.color1}
                        onChangeComplete={(color) => handleSvgParamChange('color1', color.hex)}
                        triangle="hide"
                      />
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div>
              <div className="text-default-600 mb-2">{t("end_color")}</div>
              <div className="relative">
                <Dropdown>
                  <DropdownTrigger>
                    <div className="flex items-center cursor-pointer">
                      <div 
                        className="w-10 h-10 rounded-lg border-2 border-default-300"
                        style={{ backgroundColor: params?.color2 || currentSvg.defaultParams.color2 }}
                      ></div>
                      <div className="flex-1 ml-2 bg-default-100 text-foreground rounded-lg px-3 py-2">
                        {(params?.color2 || currentSvg.defaultParams.color2).toUpperCase()}
                      </div>
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>
                      <TwitterPicker 
                        color={params?.color2 || currentSvg.defaultParams.color2}
                        onChangeComplete={(color) => handleSvgParamChange('color2', color.hex)}
                        triangle="hide"
                      />
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
          
          {/* 背景颜色选择器，仅当选择实色背景时显示 */}
          {params?.useGradientBg === false && (
            <div className="mb-4">
              <div className="text-default-600 mb-2">{t("backgroundColor")}</div>
              <div className="relative">
                <Dropdown>
                  <DropdownTrigger>
                    <div className="flex items-center cursor-pointer">
                      <div 
                        className="w-10 h-10 rounded-lg border-2 border-default-300"
                        style={{ backgroundColor: params?.backgroundColor || '#001220' }}
                      ></div>
                      <div className="flex-1 ml-2 bg-default-100 text-foreground rounded-lg px-3 py-2">
                        {(params?.backgroundColor || '#001220').toUpperCase()}
                      </div>
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>
                      <TwitterPicker 
                        color={params?.backgroundColor || '#001220'}
                        onChangeComplete={(color) => handleSvgParamChange('backgroundColor', color.hex)}
                        triangle="hide"
                      />
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          )}
 
          
          {/* 背景选项 */}
          <div>
            <div className="text-default-600 mb-2">{t("background")}</div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                className={`p-3 flex items-center justify-center ${params?.useGradientBg || !params?.hasOwnProperty('useGradientBg') ? 'bg-primary-100 text-primary-600' : 'bg-default-100'} rounded-lg`}
                onClick={() => handleSvgParamChange('useGradientBg', true)}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" fill="url(#gradient)" />
                  <defs>
                    <linearGradient id="gradient" x1="3" y1="3" x2="21" y2="21">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="ml-2">{t("gradient")}</span>
              </button>
              <button 
                className={`p-3 flex items-center justify-center ${params?.useGradientBg === false ? 'bg-primary-100 text-primary-600' : 'bg-default-100'} rounded-lg`}
                onClick={() => {
                  handleSvgParamChange('useGradientBg', false);
                  // 如果背景色未设置，给一个默认值
                  if (!params?.backgroundColor) {
                    handleSvgParamChange('backgroundColor', '#001220');
                  }
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="ml-2">{t("solid")}</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* 随机生成按钮 */}
        <Button 
          color="primary" 
          className="w-full mb-6"
          onClick={() => randomizeHeazyWave()}
        >
          {t("randomize_wave")}
        </Button>
      </>
    );

    return (
      <div className="text-foreground">
        {specificControls}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col h-screen max-w-md mx-auto relative overflow-hidden">
      {/* 原始面板内容 */}
      <div 
        className={`absolute inset-0 flex flex-col w-full h-full transition-transform duration-300 ${
          showDimensionsModal || showSvgPanel ? 'translate-x-[-100%]' : 'translate-x-0'
        }`}
      >
        <div className="w-full">
          <Navbar
            classNames={{
              wrapper: "px-4",
            }}
          >
            <NavbarBrand>
              <p className="text-gray-350 font-bold text-inherit">
                {t("property")}
              </p>
            </NavbarBrand>

            <NavbarContent justify="end">
              <NavbarItem>
                <Button
                  as={Link}
                  color="primary"
                  variant="flat"
                  target="_blank"
                  href="https://github.com/jaaronkot/picprose"
                >
                  <i
                    className={`devicon-github-plain text-[#2F6EE7] dev-icon text-xl`}
                  />
                  GitHub
                </Button>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
        </div>
        
        <div className="flex-grow overflow-y-auto overflow-x-hidden flex flex-col px-4">
          <div className="w-full py-2">
            <p className="text-sm text-gray-500 mb-1">{t("aspect")}</p>
            <div 
              className="rounded-lg bg-default-100 dark:bg-default-50 p-4 flex justify-between items-center cursor-pointer border border-default-200"
              onClick={() => setShowDimensionsModal(true)}
            >
              <div>
                <div className="text-lg font-bold">
                  {getCurrentDimensionsText().ratio}
                </div>
                <div className="text-sm text-gray-400">
                  {getCurrentDimensionsText().dimensions}
                </div>
              </div>
              <span className="text-xl text-gray-400">›</span>
            </div>
          </div>
          
          <Divider className="my-2" />
          <div className="flex w-full py-2">
            <div className="w-4/5">
              <Input
                type="url"
                label={t("mask")}
                value={propertyInfo.color}
                placeholder={propertyInfo.color}
                onChange={(e) => updateProperty("color", e.target.value)}
              />
            </div>
            <div className="flex-grow" />
            <div className="w-1/6 ml-2 mt-1">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    color="primary"
                    variant="bordered"
                    size="lg"
                    style={colorBackgroundStyle}
                  ></Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                >
                  <DropdownItem key="text">
                    <div className="m-2">
                      <CirclePicker
                        colors={[
                          "#1f2937",
                          "#e91e63",
                          "#9c27b0",
                          "#673ab7",
                          "#3f51b5",
                          "#2196f3",
                          "#03a9f4",
                          "#00bcd4",
                          "#009688",
                          "#4caf50",
                          "#8bc34a",
                          "#cddc39",
                        ]}
                        onChangeComplete={handleColorChange}
                      />
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <Slider
            label={t("transparence")}
            value={Number(parseInt(propertyInfo.blurTrans, 16) / 2.55)}
            onChange={handleBlurTransChange}
            size="sm"
            step={5}
            className="w-full my-2"
          />
          <Divider />
          <div className="flex w-full py-2 items-end gap-2">
            <div className="flex-grow">
              <Select
                label={t("font")}
                className="w-full"
                onChange={handleFontChange}
                defaultSelectedKeys={["font-anke"]}
              >
                {fontOptions.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <input
                type="file"
                className="hidden"
                onChange={handleFontUpload}
                ref={fontInputRef}
              />
              <Button
                isIconOnly
                color="primary"
                variant="flat"
                size="lg"
                onClick={handleFontButtonClick}
              >
                <svg
                  className="w-5 h-5 text-[#2F6EE7] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.3"
                    d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"
                  />
                </svg>
              </Button>
            </div>
          </div>
          <div className="flex w-full py-2 items-end gap-2">
            <div className="flex-grow">
              <Select
                label={t("icon")}
                className="w-full"
                items={deviconList}
                onSelectionChange={handleDeviconChange}
                defaultSelectedKeys={["aarch64-plain"]}
                renderValue={(items) => {
                  return items.map((item) => (
                    <div key={item.key} className="flex gap-2 items-center">
                      <i
                        className={`devicon-${item.key} text-black dev-icon text-base`}
                      ></i>
                      <div className="flex flex-col">{item.data?.name}</div>
                    </div>
                  ));
                }}
              >
                {(item) => (
                  <SelectItem
                    key={item.name + "-" + item.versions.font[0]}
                    textValue={item.name}
                  >
                    <div className="flex gap-2 items-center">
                      <i
                        className={`devicon-${item.name}-${item.versions.font[0]} text-black dev-icon text-2xl`}
                      ></i>
                      <div className="flex flex-col">{item.name}</div>
                    </div>
                  </SelectItem>
                )}
              </Select>
            </div>
            <div>
              <input
                type="file"
                className="hidden"
                onChange={handleIconUpload}
                ref={iconInputRef}
              />
              <Button
                isIconOnly
                color="primary"
                variant="flat"
                size="lg"
                onClick={handleIconButtonClick}
              >
                <svg
                  className="w-5 h-5 text-[#2F6EE7] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.3"
                    d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"
                  />
                </svg>
              </Button>
            </div>
          </div>
          <Tabs
            classNames={{
              tabList: "w-full my-2",
              tab: "w-[47px] h-12",
            }}
            aria-label="Options"
            selectedKey={propertyInfo.logoPosition}
            onSelectionChange={(key) => updateProperty("logoPosition", key.toString())}
          >
            <Tab
              key="top-4 left-4"
              title={
                <div className="flex items-center space-x-2">
                  <TopLeftIcon />
                </div>
              }
            />
            <Tab
              key="bottom-4 left-4"
              title={
                <div className="flex items-center space-x-2">
                  <BottomLeftIcon />
                </div>
              }
            />
            <Tab
              key="default"
              title={
                <div className="flex items-center space-x-2">
                  <MiddleIcon />
                </div>
              }
            />

            <Tab
              key="bottom-4 right-4"
              title={
                <div className="flex items-center space-x-2">
                  <BottomRightIcon />
                </div>
              }
            />
            <Tab
              key="top-4 right-4"
              title={
                <div className="flex items-center space-x-2">
                  <TopRightIcon />
                </div>
              }
            />
          </Tabs>

          <Divider />
          <Textarea
            label={t("title")}
            placeholder={t("title_place")}
            className="w-full py-2"
            value={propertyInfo.title}
            onValueChange={(value) => updateProperty("title", value)}
          />

          <Slider
            label={t("font_size")}
            value={Number(propertyInfo.fontSizeValue)}
            onChange={(value) => updateProperty("fontSizeValue", typeof value === "number" ? value.toString() : value[0].toString())}
            size="sm"
            step={1}
            minValue={10}
            maxValue={100}
            className="w-full my-2"
          />

          <Input
            label={t("author")}
            type="search"
            className="w-full py-2"
            placeholder="输入作者"
            value={propertyInfo.author}
            onValueChange={(value) => updateProperty("author", value)}
          />

          <Slider
            label={t("author_size")}
            value={Number(propertyInfo.authorFontSizeValue)}
            onChange={(value) => updateProperty("authorFontSizeValue", typeof value === "number" ? value.toString() : value[0].toString())}
            size="sm"
            step={1}
            minValue={10}
            maxValue={100}
            className="w-full my-2"
          />
        </div>
        
        <Divider />
        <div className="w-full mt-4 px-4 pb-4">
          <div className="text-gray-400 text-sm">{t("download")}</div>
          <div className="flex justify-between my-3">
            <Button
              onClick={() => handleImageDownload("jpg")}
              as={Link}
              color="primary"
              variant="flat"
            >
              JPG
            </Button>
            <Button
              onClick={() => handleImageDownload("png")}
              as={Link}
              color="primary"
              variant="flat"
            >
              PNG
            </Button>
            <Button
              onClick={() => handleImageDownload("svg")}
              as={Link}
              color="primary"
              variant="flat"
            >
              SVG
            </Button>
          </div>
        </div>
      </div>

      {/* 比例选择面板 */}
      <div 
        className={`absolute inset-0 flex flex-col w-full h-full bg-background dark:bg-background transition-transform duration-300 ${
          showDimensionsModal ? 'translate-x-0' : 'translate-x-[100%]'
        }`}
      >
        <div className="w-full">
          <Navbar classNames={{ wrapper: "px-4" }}>
            <NavbarBrand>
              <Button 
                isIconOnly
                variant="light" 
                onPress={() => setShowDimensionsModal(false)}
                className="mr-2"
              >
                <ChevronLeftIcon />
              </Button>
              <p className="text-gray-350 font-bold text-inherit">
                {t("select_dimensions") || "选择尺寸"}
              </p>
            </NavbarBrand>
            
            {/* 确认按钮已移除 */}
          </Navbar>
        </div>
        
        <div className="flex-grow overflow-y-auto overflow-x-hidden flex flex-col px-4">
          <div className="grid grid-cols-1 gap-2 py-2">
            <p className="text-sm font-medium text-gray-500">{t("custom_resolution") || "自定义分辨率"}</p>
            <div className="p-3 rounded-md bg-gray-100 dark:bg-gray-800">
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  min="1"
                  label={t("width") || "宽"}
                  size="sm"
                  value={String(propertyInfo.customWidth || 1185)}
                  onChange={(e) => {
                    const width = parseInt(e.target.value) || 1185;
                    updateProperty("customWidth", width);
                    updateProperty("isCustomAspect", true);
                    updateProperty("aspect", `aspect-[${width}/${propertyInfo.customHeight || 1185}]`);
                  }}
                  className="flex-1"
                />
                <span className="mx-2">×</span>
                <Input
                  type="number"
                  min="1"
                  label={t("height") || "高"}
                  size="sm"
                  value={String(propertyInfo.customHeight || 1185)}
                  onChange={(e) => {
                    const height = parseInt(e.target.value) || 1185;
                    updateProperty("customHeight", height);
                    updateProperty("isCustomAspect", true);
                    updateProperty("aspect", `aspect-[${propertyInfo.customWidth || 1185}/${height}]`);
                  }}
                  className="flex-1"
                />
              </div>
            </div>

            <Divider className="my-2" />
            
            <p className="text-sm font-medium text-gray-500">{t("landscape") || "横屏"}</p>
            {horizontalAspectOptions.map((option) => (
              <div 
                key={option.value}
                onClick={() => {
                  updateProperty("aspect", option.value);
                  updateProperty("isCustomAspect", false);
                  
                  const dimensions = option.description.split(" × ");
                  const width = parseInt(dimensions[0]);
                  const height = parseInt(dimensions[1]);
                  
                  updateProperty("customWidth", width);
                  updateProperty("customHeight", height);
                }}
                className={`p-3 rounded-md flex justify-between items-center cursor-pointer ${
                  propertyInfo.aspect === option.value && !propertyInfo.isCustomAspect 
                    ? "bg-primary-100 border border-primary-500" 
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
                {propertyInfo.aspect === option.value && !propertyInfo.isCustomAspect && (
                  <CheckboxIcon className="w-5 h-5 text-primary-500" />
                )}
              </div>
            ))}
            
            <p className="text-sm font-medium text-gray-500 mt-2">{t("portrait") || "竖屏"}</p>
            {verticalAspectOptions.map((option) => (
              <div 
                key={option.value}
                onClick={() => {
                  updateProperty("aspect", option.value);
                  updateProperty("isCustomAspect", false);
                  
                  const dimensions = option.description.split(" × ");
                  const width = parseInt(dimensions[0]);
                  const height = parseInt(dimensions[1]);
                  
                  updateProperty("customWidth", width);
                  updateProperty("customHeight", height);
                }}
                className={`p-3 rounded-md flex justify-between items-center cursor-pointer ${
                  propertyInfo.aspect === option.value && !propertyInfo.isCustomAspect 
                    ? "bg-primary-100 border border-primary-500" 
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
                {propertyInfo.aspect === option.value && !propertyInfo.isCustomAspect && (
                  <CheckboxIcon className="w-5 h-5 text-primary-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 新增SVG参数面板 - 只保留波浪图案相关的设置 */}
      <div 
        className={`absolute inset-0 flex flex-col w-full h-full bg-background dark:bg-background transition-transform duration-300 ${
          showSvgPanel ? 'translate-x-0' : 'translate-x-[100%]'
        }`}
      >
        <div className="w-full">
          <Navbar
            classNames={{
              wrapper: "px-4",
            }}
          >
            <NavbarBrand className="flex-1">
              <Button
                size="sm"
                variant="flat"
                onClick={() => setShowSvgPanel(false)}
                className="mr-2"
              >
                <ChevronLeftIcon />
              </Button>
              <p className="text-gray-350 font-bold text-inherit">
                {t("customize_svg")}
              </p>
            </NavbarBrand>
          </Navbar>
        </div>
        
        <div className="flex-grow overflow-y-auto px-4">
          {renderSvgControls()}
        </div>
      </div>
    </div>
  );
};
