"use client";
import React from "react";
import {
  Input,
  ListboxItem,
  Chip,
  ScrollShadow,
  Avatar,
  AvatarIcon,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spinner,
  Button,
  Tabs,
  Tab,
} from "@nextui-org/react";
import unsplash from "./unsplashConfig";
import { SearchIcon } from "./SearchIcon";
import PhotoAlbum from "react-photo-album";
import InfiniteScroll from "react-infinite-scroll-component";
import {useTranslations} from 'next-intl';
import { usePicprose } from "./PicproseContext";
import { SVG_BACKGROUNDS } from './svgBackgrounds';

const PHOTO_SPACING = 8;
const KEY_CODE_ENTER = 13;
const PHOTOS_PER_PAGE = 30;
const TARGET_ROW_HEIGHT = 110;
const ROW_CONSTRAINTS = { maxPhotos: 2 };

// 纯色预设
const SOLID_COLORS = [
  "#1F2937", "#1E3A8A", "#312E81", "#4C1D95", "#5B21B6", "#6D28D9", 
  "#7C3AED", "#8B5CF6", "#9333EA", "#A855F7", "#C026D3", "#D946EF", 
  "#831843", "#9D174D", "#BE185D", "#DB2777", "#E11D48", "#F43F5E", 
  "#991B1B", "#B91C1C", "#DC2626", "#EF4444", "#F59E0B", "#F97316", 
  "#FBBF24", "#065F46", "#047857", "#059669", "#10B981", "#34D399"
];

// 渐变色预设
const GRADIENT_COLORS = [
  "linear-gradient(to right, #8e2de2, #4a00e0)",
  "linear-gradient(to right, #fc466b, #3f5efb)",
  "linear-gradient(to right, #00b09b, #96c93d)",
  "linear-gradient(to right, #ff9966, #ff5e62)",
  "linear-gradient(to right, #a770ef, #cf8bf3, #fdb99b)",
  "linear-gradient(to right, #f953c6, #b91d73)",
  "linear-gradient(to right, #1e3c72, #2a5298)",
  "linear-gradient(to right, #c33764, #1d2671)",
  "linear-gradient(to right, #6190e8, #a7bfe8)",
  "linear-gradient(to right, #ff416c, #ff4b2b)",
  "linear-gradient(to right, #493240, #f09)",
  "linear-gradient(to right, #0f0c29, #302b63, #24243e)"
];

// 纹理背景预设
const PATTERN_BACKGROUNDS = [
  // 点状图案
  {
    name: "点状图案",
    value: "radial-gradient(#444cf7 1px, transparent 1px) 0 0 / 20px 20px",
    bgColor: "#ffffff"
  },
  // 网格线
  {
    name: "网格线",
    value: "linear-gradient(#444cf7 1px, transparent 1px) 0 0 / 20px 20px, linear-gradient(90deg, #444cf7 1px, transparent 1px) 0 0 / 20px 20px",
    bgColor: "#ffffff"
  },
  // 对角线
  {
    name: "对角线",
    value: "repeating-linear-gradient(45deg, #444cf7, #444cf7 5px, transparent 5px, transparent 25px)",
    bgColor: "#ffffff"
  },
  // 波浪图案
  {
    name: "波浪图案",
    value: "repeating-radial-gradient(#444cf7, #444cf7 1px, transparent 1px, transparent 13px)",
    bgColor: "#ffffff"
  },
  // 条纹图案
  {
    name: "条纹图案",
    value: "repeating-linear-gradient(-45deg, #f472b6, #f472b6 10px, #ffffff 10px, #ffffff 20px)",
    bgColor: "#ffffff"
  },
  // 植物图案
  {
    name: "植物图案",
    value: "radial-gradient(circle at 0% 50%, rgba(96, 165, 250, 0.2) 9px, transparent 10px), radial-gradient(at 100% 100%, rgba(52, 211, 153, 0.2) 15px, transparent 16px)",
    bgColor: "#f8fafc"
  },
  // 方块拼图
  {
    name: "方块拼图",
    value: "linear-gradient(135deg, #f7acbc 25%, transparent 25%) -20px 0, linear-gradient(225deg, #f7acbc 25%, transparent 25%) -20px 0, linear-gradient(315deg, #f7acbc 25%, transparent 25%), linear-gradient(45deg, #f7acbc 25%, transparent 25%)",
    bgColor: "#ffb6c1"
  },
  // 六边形
  {
    name: "六边形",
    value: "radial-gradient(circle at 33% 33%, #f8b195 5%, transparent 5.5%), radial-gradient(circle at 72% 64%, #8b5cf6 5%, transparent 5.5%), radial-gradient(circle at 45% 85%, #3b82f6 5%, transparent 5.5%), radial-gradient(circle at 75% 20%, #06b6d4 5%, transparent 5.5%), radial-gradient(circle at 20% 60%, #22c55e 5%, transparent 5.5%)",
    bgColor: "#ffffff"
  },
  // 圆点阵列
  {
    name: "圆点阵列",
    value: "radial-gradient(#c06c84 20%, transparent 20%) 0 0 / 20px 20px, radial-gradient(#c06c84 20%, transparent 20%) 10px 10px / 20px 20px",
    bgColor: "#ffffff"
  },
  // 几何三角形
  {
    name: "几何三角形",
    value: "linear-gradient(30deg, #6d28d9 12%, transparent 12.5%, transparent 87%, #6d28d9 87.5%, #6d28d9), linear-gradient(150deg, #6d28d9 12%, transparent 12.5%, transparent 87%, #6d28d9 87.5%, #6d28d9), linear-gradient(30deg, #6d28d9 12%, transparent 12.5%, transparent 87%, #6d28d9 87.5%, #6d28d9), linear-gradient(150deg, #6d28d9 12%, transparent 12.5%, transparent 87%, #6d28d9 87.5%, #6d28d9), linear-gradient(60deg, #a78bfa 25%, transparent 25.5%, transparent 75%, #a78bfa 75%, #a78bfa), linear-gradient(60deg, #a78bfa 25%, transparent 25.5%, transparent 75%, #a78bfa 75%, #a78bfa)",
    bgColor: "#ffffff"
  },
  // 交叉线条
  {
    name: "交叉线条",
    value: "repeating-linear-gradient(0deg, #38bdf8, #38bdf8 2px, transparent 2px, transparent 20px), repeating-linear-gradient(90deg, #38bdf8, #38bdf8 2px, transparent 2px, transparent 20px)",
    bgColor: "#ffffff" 
  },
  // 霓虹斑点
  {
    name: "霓虹斑点",
    value: "radial-gradient(circle at 50% 0%, #fb7185 10%, #4f46e5 15%, transparent 60%), radial-gradient(circle at 85% 30%, #2dd4bf 15%, #8b5cf6 30%, transparent 55%), radial-gradient(circle at 10% 70%, #f59e0b 5%, #ec4899 15%, transparent 35%)",
    bgColor: "#0f172a"
  },
  // 棋盘格
  {
    name: "棋盘格",
    value: "linear-gradient(45deg, #444cf722 25%, transparent 25%) 0 0 / 20px 20px, linear-gradient(-45deg, #444cf722 25%, transparent 25%) 0 0 / 20px 20px, linear-gradient(45deg, transparent 75%, #444cf722 75%) 0 0 / 20px 20px, linear-gradient(-45deg, transparent 75%, #444cf722 75%) 0 0 / 20px 20px",
    bgColor: "#ffffff"
  },
  // 马赛克
  {
    name: "马赛克",
    value: "linear-gradient(135deg, #eab308 21px, #fef08a 22px, #fef08a 24px, transparent 24px, transparent 67px, #fef08a 67px, #fef08a 69px, transparent 69px), linear-gradient(225deg, #eab308 21px, #fef08a 22px, #fef08a 24px, transparent 24px, transparent 67px, #fef08a 67px, #fef08a 69px, transparent 69px) 0 64px",
    bgColor: "#eab308"
  },
  // 像素点
  {
    name: "像素点",
    value: "linear-gradient(90deg, rgba(166, 173, 186, 0.2) 2px, transparent 0), linear-gradient(180deg, rgba(166, 173, 186, 0.2) 2px, transparent 0)",
    bgColor: "#f1f5f9"
  },
  // 纸张纹理
  {
    name: "纸张纹理",
    value: "linear-gradient(135deg, rgba(0, 0, 0, 0.03) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.03) 50%, rgba(0, 0, 0, 0.03) 75%, transparent 75%, transparent)",
    bgColor: "#f5f5f4"
  },
  // 彩色泡泡
  {
    name: "彩色泡泡",
    value: "radial-gradient(circle at 33% 33%, #f43f5e 5%, transparent 5.5%), radial-gradient(circle at 72% 64%, #8b5cf6 5%, transparent 5.5%), radial-gradient(circle at 45% 85%, #3b82f6 5%, transparent 5.5%), radial-gradient(circle at 75% 20%, #06b6d4 5%, transparent 5.5%), radial-gradient(circle at 20% 60%, #22c55e 5%, transparent 5.5%)",
    bgColor: "#ffffff"
  }
];

// 更新SvgPatternPanel组件
const SvgPatternPanel = () => {
  const { 
    setBackgroundType, 
    setBackgroundPattern,
    setSelectedSvgIndex,
    selectedSvgIndex,
    setSvgPatternParams,
    setShowSvgPanel 
  } = usePicprose();
  const t = useTranslations('LeftResourcePanel');
  
  // 手动定义角落模板，确保可用
  const cornerTemplate = (params: any) => {
    const { backgroundColor, color1, color2, cornerRadius, cornerCount, strokeWidth, rotation } = params;
    
    // 简化的角落实现
    return `<svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="${backgroundColor}" />
      <g transform="rotate(${rotation || 0}, 400, 300)">
        <path d="M200,150 Q350,50 500,150 T700,150" 
              fill="none" stroke="${color1}" stroke-width="${strokeWidth || 30}" />
        <path d="M100,300 Q250,200 400,300 T600,300" 
              fill="none" stroke="${color2}" stroke-width="${strokeWidth || 30}" />
      </g>
    </svg>`;
  };
  
  // 如果SVG_BACKGROUNDS不完整，手动添加角落模板
  let svgBgs = [...(SVG_BACKGROUNDS || [])];
  
  // 检查是否已经存在角落模板
  const hasCornerTemplate = svgBgs.some(bg => bg.name === "角落");
  
  // 如果没有角落模板，添加一个
  if (!hasCornerTemplate && svgBgs.length > 0) {
    svgBgs.push({
      name: "角落",
      svgTemplate: cornerTemplate,
      defaultParams: {
        color1: "#ff0071ff",
        color2: "#95ffa1ff",
        backgroundColor: "#95ffda",
        cornerRadius: 150,
        cornerCount: 5,
        strokeWidth: 30,
        rotation: 0,
        contrast: 50
      }
    });
  }
  
  // 确保有可用的模板
  if (!svgBgs || svgBgs.length === 0) {
    return (
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">{t('svg_patterns')}</h3>
        <div className="text-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
          未找到SVG效果，请确保SVG模板已正确配置
        </div>
      </div>
    );
  }
  
  const handlePatternSelect = (index: number) => {
    if (index < 0 || index >= svgBgs.length) return;
    
    const selectedSvg = svgBgs[index];
    
    // 克隆默认参数以避免引用问题
    const defaultParams = JSON.parse(JSON.stringify(selectedSvg.defaultParams));
    
    // 设置选中的SVG索引和默认参数
    setSelectedSvgIndex(index);
    setSvgPatternParams(defaultParams);
    setShowSvgPanel(true);
    
    try {
      // 应用默认参数的SVG
      const svgPattern = selectedSvg.svgTemplate(defaultParams);
      const encodedSvg = `url("data:image/svg+xml;utf8,${encodeURIComponent(svgPattern)}")`;
      setBackgroundType('svg');
      setBackgroundPattern(encodedSvg);
    } catch (error) {
    }
  };

  // 使用安全的渲染方式
  const renderSvgPreview = (index: number) => {
    if (index >= svgBgs.length) {
      return <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">SVG不可用</div>;
    }
    
    const svg = svgBgs[index];
    
    if (!svg || !svg.svgTemplate || !svg.defaultParams) {
      return <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">模板无效</div>;
    }
    
    try {
      const svgString = svg.svgTemplate(svg.defaultParams);
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: svgString }} 
          style={{ width: '100%', height: '100%' }}
        />
      );
    } catch (error) {
      return <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">渲染错误</div>;
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">{t('svg_patterns')}</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Heazy波浪SVG模板 */}
        <div className="flex flex-col items-center">
          <div 
            className={`w-full aspect-[4/3] rounded-md cursor-pointer hover:scale-105 transition-transform overflow-hidden ${selectedSvgIndex === 0 ? 'border-2 border-blue-500' : 'border border-gray-300 dark:border-gray-700'}`}
            onClick={() => handlePatternSelect(0)}
            style={{ backgroundImage: 'url(waves.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
          </div>
          <div className="text-center text-default-600 mt-2">
            {svgBgs[0]?.name || "波浪"}
          </div>
        </div>
        
        {/* 角落SVG模板 */}
        <div className="flex flex-col items-center">
          <div 
            className={`w-full aspect-[4/3] rounded-md cursor-pointer hover:scale-105 transition-transform overflow-hidden ${selectedSvgIndex === 1 ? 'border-2 border-blue-500' : 'border border-gray-300 dark:border-gray-700'}`}
            onClick={() => handlePatternSelect(1)}
            style={{ backgroundImage: 'url(corners.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
           
          </div>
          <div className="text-center text-default-600 mt-2">
            {svgBgs[1]?.name || "角落"}
          </div>
        </div>
      </div>
    </div>
  );
};

export const GalleryIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M2.67004 18.9501L7.60004 15.6401C8.39004 15.1101 9.53004 15.1701 10.24 15.7801L10.57 16.0701C11.35 16.7401 12.61 16.7401 13.39 16.0701L17.55 12.5001C18.33 11.8301 19.59 11.8301 20.37 12.5001L22 13.9001"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
  
// 添加颜色选择图标
export const PaletteIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        d="M10 16.5C10 17.88 8.88 19 7.5 19C6.12 19 5 17.88 5 16.5C5 15.12 6.12 14 7.5 14C8.88 14 10 15.12 10 16.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M14.5 9C15.8807 9 17 7.88071 17 6.5C17 5.11929 15.8807 4 14.5 4C13.1193 4 12 5.11929 12 6.5C12 7.88071 13.1193 9 14.5 9Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M18.5 13C19.0523 13 19.5 12.5523 19.5 12C19.5 11.4477 19.0523 11 18.5 11C17.9477 11 17.5 11.4477 17.5 12C17.5 12.5523 17.9477 13 18.5 13Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

// 颜色选择组件
const ColorPanel = () => {
  const { setBackgroundType, setBackgroundColor } = usePicprose();
  const t = useTranslations('LeftResourcePanel');

  const handleColorSelect = (color: string) => {
    setBackgroundType('color');
    setBackgroundColor(color);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">{t('solid_colors')}</h3>
      <div className="grid grid-cols-6 gap-2 mb-6">
        {SOLID_COLORS.map((color, index) => (
          <div 
            key={index}
            className="w-full aspect-square rounded-md cursor-pointer hover:scale-110 transition-transform border border-gray-300 dark:border-gray-700"
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
          />
        ))}
      </div>

      <h3 className="text-lg font-medium my-4">{t('gradient_colors')}</h3>
      <div className="grid grid-cols-3 gap-2">
        {GRADIENT_COLORS.map((gradient, index) => (
          <div 
            key={index}
            className="w-full h-20 rounded-md cursor-pointer hover:scale-105 transition-transform border border-gray-300 dark:border-gray-700"
            style={{ background: gradient }}
            onClick={() => handleColorSelect(gradient)}
          />
        ))}
      </div>
    </div>
  );
};

// 添加 SVG 图标组件
export const SvgIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M15 9.5C15 8.12 13.88 7 12.5 7C11.12 7 10 8.12 10 9.5C10 10.88 11.12 12 12.5 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M16.5 14.5C16.5 15.88 15.38 17 14 17C12.62 17 11.5 15.88 11.5 14.5C11.5 13.12 12.62 12 14 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M9 15L15 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

// 添加布局图标
export const LayoutIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

// 创建布局面板组件
const LayoutPanel = () => {
  const { setElementsLayout } = usePicprose();
  const t = useTranslations('LeftResourcePanel');

  // 预设的布局选项 - 更新为独立元素定位
  const layoutPresets = [
    {
      name: t('layout_magazine_cover'),
      description: t('layout_magazine_cover_desc'),
      elements: {
        title: { x: 0, y: -170, visible: true },
        author: { x: 180, y: -40, visible: true },
        icon: { x: -180, y: -190, visible: true },
      },
      preview: "layout-magazine.svg"
    },
    {
      name: t('layout_movie_poster'),
      description: t('layout_movie_poster_desc'),
      elements: {
        title: { x: 0, y: -120, visible: true },
        author: { x: 0, y: 20, visible: true },
        icon: { x: 0, y: 180, visible: true },
      },
      preview: "layout-movie.svg"
    },
    {
      name: t('layout_book_cover'),
      description: t('layout_book_cover_desc'),
      elements: {
        title: { x: 0, y: -100, visible: true },
        author: { x: 0, y: 180, visible: true },
        icon: { x: 0, y: 40, visible: true },
      },
      preview: "layout-book.svg"
    },
    {
      name: t('layout_minimal_poster'),
      description: t('layout_minimal_poster_desc'),
      elements: {
        title: { x: 0, y: 0, visible: true },
        author: { x: 0, y: 190, visible: true },
        icon: { x: 200, y: -190, visible: true },
      },
      preview: "layout-minimal-poster.svg"
    },
    {
      name: t('layout_asymmetric'),
      description: t('layout_asymmetric_desc'),
      elements: {
        title: { x: -160, y: 140, visible: true },
        author: { x: 160, y: 140, visible: true },
        icon: { x: -160, y: -140, visible: true },
      },
      preview: "layout-asymmetric.svg"
    },
    {
      name: t('layout_split'),
      description: t('layout_split_desc'),
      elements: {
        title: { x: -170, y: 0, visible: true },
        author: { x: 170, y: 50, visible: true },
        icon: { x: 170, y: -50, visible: true },
      },
      preview: "layout-split.svg"
    },
    {
      name: t('layout_banner'),
      description: t('layout_banner_desc'),
      elements: {
        title: { x: 0, y: 140, visible: true },
        author: { x: -180, y: -180, visible: true },
        icon: { x: 180, y: -180, visible: true },
      },
      preview: "layout-banner.svg"
    },
    {
      name: t('layout_thirds'),
      description: t('layout_thirds_desc'),
      elements: {
        title: { x: 0, y: -70, visible: true },
        author: { x: -150, y: 170, visible: true },
        icon: { x: 150, y: 170, visible: true },
      },
      preview: "layout-thirds.svg"
    },
    {
      name: t('layout_brand'),
      description: t('layout_brand_desc'),
      elements: {
        title: { x: 0, y: 0, visible: true },
        author: { x: 0, y: 60, visible: true },
        icon: { x: 0, y: -80, visible: true },
      },
      preview: "layout-brand.svg"
    },
    {
      name: t('layout_social_media'),
      description: t('layout_social_media_desc'),
      elements: {
        title: { x: 0, y: -30, visible: true },
        author: { x: 0, y: 30, visible: true },
        icon: { x: -150, y: -150, visible: true },
      },
      preview: "layout-social.svg"
    },
    {
      name: t('layout_clean_title'),
      description: t('layout_clean_title_desc'),
      elements: {
        title: { x: 0, y: 0, visible: true },
        author: { x: 0, y: 170, visible: false },
        icon: { x: 0, y: 90, visible: false },
      },
      preview: "layout-clean-title.svg"
    },
    {
      name: t('layout_author_spotlight'),
      description: t('layout_author_spotlight_desc'),
      elements: {
        title: { x: 0, y: -150, visible: true },
        author: { x: 0, y: 0, visible: true },
        icon: { x: -150, y: 0, visible: true },
      },
      preview: "layout-author-spotlight.svg"
    }
  ];

  // 应用布局
  const applyLayout = (layout: any) => {
    setElementsLayout(layout.elements);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">{t('layout_presets')}</h3>
      <div className="grid grid-cols-2 gap-4">
        {layoutPresets.map((layout, index) => (
          <div 
            key={index}
            className="flex flex-col items-center"
            onClick={() => applyLayout(layout)}
          >
            <div 
              className="w-full aspect-[4/3] rounded-md cursor-pointer hover:scale-105 transition-transform border border-gray-300 dark:border-gray-700 overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800"
            >
              <div className="w-full h-full p-2 flex items-center justify-center">
                <div className="w-full h-full relative bg-gradient-to-b from-gray-700 to-gray-900 rounded-md flex items-center justify-center">
                  {/* 标题元素预览 */}
                  <div className="absolute w-16 h-1 bg-white/80 rounded-full" style={{ 
                    transform: `translate(${layout.elements.title.x/5}px, ${layout.elements.title.y/5}px)`,
                    opacity: layout.elements.title.visible ? 1 : 0.3
                  }}></div>
                  
                  {/* 作者元素预览 */}
                  <div className="absolute w-12 h-0.5 bg-white/60 rounded-full" style={{ 
                    transform: `translate(${layout.elements.author.x/5}px, ${layout.elements.author.y/5}px)`,
                    opacity: layout.elements.author.visible ? 1 : 0.3
                  }}></div>
                  
                  {/* 图标元素预览 */}
                  <div className="absolute w-2 h-2 bg-white/60 rounded-full" style={{ 
                    transform: `translate(${layout.elements.icon.x/5}px, ${layout.elements.icon.y/5}px)`,
                    opacity: layout.elements.icon.visible ? 1 : 0.3
                  }}></div>
                </div>
              </div>
            </div>
            <div className="text-center text-default-600 mt-2">
              {layout.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const LeftResourcePanel = () => {
  const t = useTranslations('LeftResourcePanel');
  const { setImageInfo, setBackgroundType } = usePicprose();
  
  const [photos, setPhotos] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [shouldFetchRandomPhotos, setShouldFetchRandomPhotos] = React.useState(true);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [hasMorePhotos, setHasMorePhotos] = React.useState(true);
  const [hasSetInitialPhoto, setHasSetInitialPhoto] = React.useState(false);
  const [windowHeight, setWindowHeight] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const scrollPositionRef = React.useRef(0);
  
  // 添加当前标签页状态
  const [activeTab, setActiveTab] = React.useState("images");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      setImageInfo({
        url: file,
        name: "PicProse",
        avatar: "default-author.jpg",
        profile: "default",
        downloadLink: "",
      });
      setBackgroundType('image'); // 设置背景类型为图片
    }
  };

  const fetchPhotosBySearch = (searchText: string, page: number) => {
    fetch(`/api/unsplash?query=${encodeURIComponent(searchText)}&page=${page}&perPage=${PHOTOS_PER_PAGE}`)
      .then(response => response.json())
      .then(result => {
        if (result.type === "success") {
          const photos = result.response.results.map((item: any) => {
            return {
              src: item.urls.small,
              url: item.urls.regular,
              key: item.id,
              alt: item.alt_description,
              width: item.width,
              height: item.height,
              name: item.user.name,
              avatar: item.user.profile_image.small,
              profile: `${item.user.links.html}?utm_source=PicProse&utm_medium=referral`,
            };
          });
          
          if (photos.length < PHOTOS_PER_PAGE) {
            setHasMorePhotos(false);
          }
          
          if (page === 1) {
            setPhotos(photos);
            setTimeout(() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = 0;
              }
            }, 0);
          } else {
            setPhotos(prevPhotos => [...prevPhotos, ...photos]);
            setTimeout(() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = scrollPositionRef.current;
              }
            }, 0);
          }
        }
      });
  };

  const fetchRandomPhotos = () => {
    fetch('/api/unsplash')
      .then(response => response.json())
      .then(result => {
        if (result && result.response) {
          const responseArray = Array.isArray(result.response) 
            ? result.response 
            : [result.response];
            
          var photos = responseArray.map((item: any) => {
            return {
              src: item.urls.small,
              url: item.urls.regular,
              key: item.id,
              alt: item.alt_description,
              width: item.width,
              height: item.height,
              name: item.user.name,
              avatar: item.user.profile_image.small,
              profile: `${item.user.links.html}?utm_source=PicProse&utm_medium=referral`,
            };
          });
          if (photos.length < PHOTOS_PER_PAGE) {
            setHasMorePhotos(false);
          }
          if(!hasSetInitialPhoto) {
            setHasSetInitialPhoto(true)
            selectPhoto(Math.floor(Math.random() * 20), photos)
          }
          setPhotos(prevPhotos => [...prevPhotos, ...photos]);
        }
      });
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === KEY_CODE_ENTER) {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchQuery === "") {
      return;
    }

    setShouldFetchRandomPhotos(false);
    setHasMorePhotos(true);
    const page = 1;
    setCurrentPage(page);
    fetchPhotosBySearch(searchQuery, page);
  };

  const handleLoadMore = () => {
    if (shouldFetchRandomPhotos) {
      fetchRandomPhotos();
    } else {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPhotosBySearch(searchQuery, nextPage);
    }
  };

  React.useEffect(() => {
    setWindowHeight(window.innerHeight);
    
    fetchRandomPhotos();

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 清除事件监听器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const selectPhoto = (index: number, photoList: any[]) => {
    setImageInfo(photoList[index]);
    setBackgroundType('image'); // 设置背景类型为图片
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 图片面板内容
  const renderImagePanel = () => (
    <div className="flex-grow relative">
      <InfiniteScroll
        className="overflow-y-auto scrollbar-thin scrollbar-color-auto px-3"
        dataLength={photos.length}
        height={windowHeight - 220}
        next={handleLoadMore}
        hasMore={hasMorePhotos}
        loader={
          <div className="grid justify-items-center">
            <Spinner className="my-4" />
          </div>
        }
        endMessage={
          <div className="grid justify-items-center">
            <div className="my-4">{t('search_end')}</div>
          </div>
        }
      >
        <PhotoAlbum
          photos={photos}
          layout="rows"
          targetRowHeight={TARGET_ROW_HEIGHT}
          rowConstraints={ROW_CONSTRAINTS}
          spacing={PHOTO_SPACING}
          onClick={({ index }) => selectPhoto(index, photos)}
        />
      </InfiniteScroll>
      <div className="absolute bottom-0 left-0 m-4 w-40 h-6 bg-black bg-opacity-65 rounded-xl">
        <div className="flex items-center ml-2">
          <span className="leading-6 text-xs text-white text-center">
            {t('powered_by')}
          </span>
          <a
            href="https://unsplash.com/?utm_source=PicProse&utm_medium=referral"
            target="_blank"
          >
            <img className="w-20 h-4" src="./Unsplash_Logo_Full.svg" />
          </a>
        </div>
      </div>
    </div>
  );

  // 颜色面板内容
  const renderColorPanel = () => (
    <div className="flex-grow" style={{ height: windowHeight - 220 }}>
      <ScrollShadow className="h-full overflow-y-auto">
        <ColorPanel />
      </ScrollShadow>
    </div>
  );

  // 纹理面板内容
  const renderPatternPanel = () => (
    <div className="flex-grow" style={{ height: windowHeight - 220 }}>
      <ScrollShadow className="h-full overflow-y-auto">
        <SvgPatternPanel />
      </ScrollShadow>
    </div>
  );

  // 添加布局面板内容
  const renderLayoutPanel = () => (
    <div className="flex-grow" style={{ height: windowHeight - 220 }}>
      <ScrollShadow className="h-full overflow-y-auto">
        <LayoutPanel />
      </ScrollShadow>
    </div>
  );

  return (
    <div className="w-full flex flex-col h-screen">
      {/* 头部导航 */}
      <div className="w-full flex-none">
        <Navbar
          classNames={{
            wrapper: "px-4",
          }}
        >
          <NavbarBrand>
            <img className="w-7" src="logo.png" alt="Picprose Logo" />
            <p className="font-bold text-inherit">PicProse</p>
          </NavbarBrand>
          <NavbarContent justify="end">
            <NavbarItem>
              <Avatar
                isBordered
                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
              />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
      
      {/* 标签页容器 - 使用flex-grow填充可用空间但不超出 */}
      <div className="px-2 pt-2 flex-grow flex flex-col">
        <Tabs 
          selectedKey={activeTab} 
          onSelectionChange={(key) => setActiveTab(key as string)}
          color="default"
          variant="solid"
          fullWidth
          classNames={{
            base: "flex flex-col flex-grow",
            panel: "flex-grow overflow-hidden",
            tabList: "mb-0 text-xs",  // 添加text-xs类来减小整体文本大小
            tab: "py-1.5 px-1" // 减小标签页内边距
          }}
        >
          <Tab 
            key="images" 
            title={
              <div className="flex items-center gap-1">  {/* gap从2减小到1 */}
                <GalleryIcon className="w-4 h-4" />  {/* 添加w-4 h-4类来减小图标尺寸 */}
                <span className="text-xs">{t('images_tab')}</span>  {/* 添加text-xs类明确设置字体大小 */}
              </div>
            }
          >
            {renderImagePanel()}
          </Tab>
          <Tab 
            key="colors" 
            title={
              <div className="flex items-center gap-1">
                <PaletteIcon className="w-4 h-4" />
                <span className="text-xs">{t('colors_tab')}</span>
              </div>
            }
          >
            {renderColorPanel()}
          </Tab>
          <Tab 
            key="patterns" 
            title={
              <div className="flex items-center gap-1">
                <SvgIcon className="w-4 h-4" />
                <span className="text-xs">{t('patterns_tab')}</span>
              </div>
            }
          >
            {renderPatternPanel()}
          </Tab>
          <Tab 
            key="layouts" 
            title={
              <div className="flex items-center gap-1">
                <LayoutIcon className="w-4 h-4" />
                <span className="text-xs">{t('layouts_tab')}</span>
              </div>
            }
          >
            {renderLayoutPanel()}
          </Tab>
        </Tabs>
      </div>
      
      {/* 底部导航 - 使用flex-none确保不会被挤压 */}
      <div className="w-full flex-none mt-auto">
        <Navbar
          classNames={{
            wrapper: "px-4",
          }}
        >
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <Button
            variant="flat"
            color="primary"
            isIconOnly
            onClick={handleButtonClick}
          >
            <svg
              className="w-5 h-5 text-[#2F6EE7] dark:text-white/90 text-slate-450 pointer-events-none flex-shrink-0"
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
          <Input
            type="search"
            placeholder={t('input_search')}
            value={searchQuery}
            onValueChange={setSearchQuery}
            onKeyDown={(e) => handleSearchKeyDown(e)}
            isDisabled={activeTab !== "images"}
          />

          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                isIconOnly
                variant="flat"
                color="primary"
                onClick={handleSearch}
                isDisabled={activeTab !== "images"}
              >
                <SearchIcon className="text-[#2F6EE7] mb-0.5 dark:text-white/90 text-slate-450 pointer-events-none flex-shrink-0" />
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
    </div>
  );
};
