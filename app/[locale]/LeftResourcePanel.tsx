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

export const LeftResourcePanel = () => {
  const t = useTranslations('LeftResourcePanel');
  const { setImageInfo } = usePicprose();
  
  const [photos, setPhotos] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [shouldFetchRandomPhotos, setShouldFetchRandomPhotos] = React.useState(true);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<any>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [hasMorePhotos, setHasMorePhotos] = React.useState(true);
  const [hasSetInitialPhoto, setHasSetInitialPhoto] = React.useState(false);
  const [windowHeight, setWindowHeight] = React.useState(0);
 
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
    }
  };

  const fetchPhotosBySearch = (searchText = "dev", page = 1) => {
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
          } else {
            setPhotos(prevPhotos => [...prevPhotos, ...photos]);
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

    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
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
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
      <div className="flex-grow relative">
        <InfiniteScroll
          ref={scrollRef}
          className="overflow-y-scroll scrollbar-thin scrollbar-color-auto px-3"
          dataLength={photos.length}
          height={windowHeight - 130}
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
        <div className="absolute bottom-0 left-0 m-4 w-40 h-6 bg-black bg-opacity-65  rounded-xl">
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
      <div className="w-full">
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
          />

          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                isIconOnly
                variant="flat"
                color="primary"
                onClick={handleSearch}
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
