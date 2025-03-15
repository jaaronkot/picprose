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

export const MusicIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M16.5 6.6998L14.87 8.3298C14.34 8.8598 13.5 8.8598 12.97 8.3298L11.34 6.6998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M12 17.9999C14.2091 17.9999 16 16.2091 16 13.9999C16 11.7908 14.2091 9.99988 12 9.99988C9.79086 9.99988 8 11.7908 8 13.9999C8 16.2091 9.79086 17.9999 12 17.9999Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export const VideoIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
      <path d="M14.7295 2H9.26953V6.36H14.7295V2Z" fill="currentColor" />
      <path d="M16.2305 2V6.36H21.8705C21.3605 3.61 19.3305 2.01 16.2305 2Z" fill="currentColor" />
      <path
        d="M2 7.85938V16.1894C2 19.8294 4.17 21.9994 7.81 21.9994H16.19C19.83 21.9994 22 19.8294 22 16.1894V7.85938H2ZM14.44 16.1794L12.36 17.3794C11.92 17.6294 11.49 17.7594 11.09 17.7594C10.79 17.7594 10.52 17.6894 10.27 17.5494C9.69 17.2194 9.37 16.5394 9.37 15.6594V13.2594C9.37 12.3794 9.69 11.6994 10.27 11.3694C10.85 11.0294 11.59 11.0894 12.36 11.5394L14.44 12.7394C15.21 13.1794 15.63 13.7994 15.63 14.4694C15.63 15.1394 15.2 15.7294 14.44 16.1794Z"
        fill="currentColor"
      />
      <path d="M7.76891 2C4.66891 2.01 2.63891 3.61 2.12891 6.36H7.76891V2Z" fill="currentColor" />
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

  const fetchPhotosBySearch = (searchText = "dev", page = 1) => {
    if (scrollContainerRef.current) {
      scrollPositionRef.current = scrollContainerRef.current.scrollTop;
    }
    
    unsplash.search
      .getPhotos({
        query: searchText,
        page: page,
        perPage: PHOTOS_PER_PAGE,
      })
      .then((result) => {
        if (result.type === "success") {
          var photos = result.response.results.map((item) => {
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
          if (page == 1) {
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
    unsplash.photos
      .getRandom({
        count: PHOTOS_PER_PAGE,
      })
      .then((result) => {
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
        className="overflow-y-scroll scrollbar-thin scrollbar-color-auto px-3"
        dataLength={photos.length}
        height={windowHeight - 180} // 调整高度以适应标签页
        next={handleLoadMore}
        hasMore={hasMorePhotos}
        loader={
          <div className="grid justify-items-center ">
            <Spinner className="my-4" />
          </div>
        }
        endMessage={
          <div className="grid justify-items-center ">
            <div className="my-4">{t('search_end')}</div>
          </div>
        }
        scrollableTarget="scrollableDiv"
      >
        <div id="scrollableDiv" ref={scrollContainerRef} style={{ height: '100%', overflow: 'auto' }}>
          <PhotoAlbum
            photos={photos}
            layout="rows"
            targetRowHeight={TARGET_ROW_HEIGHT}
            rowConstraints={ROW_CONSTRAINTS}
            spacing={PHOTO_SPACING}
            onClick={({ index }) => selectPhoto(index, photos)}
          />
        </div>
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
    <div className="flex-grow overflow-y-auto" style={{ height: windowHeight - 180 }}>
      <ScrollShadow className="h-full">
        <ColorPanel />
      </ScrollShadow>
    </div>
  );

  return (
    <div className="w-full flex flex-col h-screen">
      <div className="w-full">
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
      
      {/* 添加标签页 */}
      <div className="px-2 pt-2">
        <Tabs 
          selectedKey={activeTab} 
          onSelectionChange={(key) => setActiveTab(key as string)}
          color="default"
          variant="solid"
          fullWidth
        >
          <Tab 
            key="images" 
            title={
              <div className="flex items-center gap-2">
                <GalleryIcon />
                <span>{t('images_tab')}</span>
              </div>
            }
          >
            {renderImagePanel()}
          </Tab>
          <Tab 
            key="colors" 
            title={
              <div className="flex items-center gap-2">
                <PaletteIcon />
                <span>{t('colors_tab')}</span>
              </div>
            }
          >
            {renderColorPanel()}
          </Tab>
        </Tabs>
      </div>
      
      <div className="w-full mt-auto">
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
