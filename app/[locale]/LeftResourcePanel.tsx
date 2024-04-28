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
import { PicproseLogo } from "./PicproseLogo";
import PhotoAlbum from "react-photo-album";
import InfiniteScroll from "react-infinite-scroll-component";
import {useTranslations} from 'next-intl';
const PHOTO_SPACING = 8;
const KEY_CODE_ENTERN = 13;
const PHOTO_COUNT_PER_PAGE = 30;
const TARGET_ROW_HEIGHT = 110;
const ROW_CONSTRAINTS = { maxPhotos: 2 };

export const LeftResourcePanel = (props) => {
  const t = useTranslations('LeftResourcePanel');
  const [imageList, setImageList] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isNeedRandomPhoto, setIsNeedRandomPhoto] = React.useState(true);
  const inputRef = React.useRef(null);
  const [unsplashPage, setUnsplashPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [hasSetFirstRandomPhoto, setHasSetFirstRandomPhoto] = React.useState(false);

  const [windowHeight, setWindowHeight] = React.useState(0);
 

  const handleFileChange = (event) => {
    if (event.target.files[0] != null) {
      const file = URL.createObjectURL(event.target.files[0]);
      props.onData({
        url: file,
        name: "PicProse",
        avatar: "default-author.jpg",
        profile: "default",
        downloadLink: "",
      });
    }
  };

  const searchImages = (searchText: string = "dev", pageNum: number = 1) => {
    unsplash.search
      .getPhotos({
        query: searchText,
        page: pageNum,
        perPage: PHOTO_COUNT_PER_PAGE,
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
          if (photos.length < PHOTO_COUNT_PER_PAGE) {
            setHasMore(false);
          }
          if (pageNum == 1) {
            setImageList(photos);
          } else {
            setImageList([...imageList, ...photos]);
          }
        }
      });
  };

  const fetchRandomPhotos = () => {
    unsplash.photos
      .getRandom({
        count: PHOTO_COUNT_PER_PAGE,
      })
      .then((result) => {
        var photos = result.response.map((item) => {
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
        if (photos.length < PHOTO_COUNT_PER_PAGE) {
          setHasMore(false);
        }
        if(!hasSetFirstRandomPhoto) {
          setHasSetFirstRandomPhoto(true)
          selectImage(Math.floor(Math.random() * 20), photos)
        }
        setImageList([...imageList, ...photos]);
      });
  };

  const onSearchKeydown = (e) => {
    if (e.keyCode === KEY_CODE_ENTERN) {
      fetchImage();
    }
  };

  const fetchImage = () => {
    if (searchValue === "") {
      return;
    }

    setIsNeedRandomPhoto(false);
    setHasMore(true);
    const pageNum = 1;
    setUnsplashPage(pageNum);
    searchImages(searchValue, pageNum);
  };

  const onScrollToBottom = () => {
    if (isNeedRandomPhoto) {
      // fetch more random image
      fetchRandomPhotos();
    } else {
      // search more image
      const pageNum = unsplashPage + 1;
      setUnsplashPage(pageNum);
      searchImages(searchValue, pageNum);
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


  //
  const selectImage = (index: number, imageList:[]) => {
    props.onData(imageList[index]);
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
            <PicproseLogo />
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
          className="overflow-y-scroll scrollbar-thin scrollbar-color-auto px-3"
          dataLength={imageList.length}
          height={windowHeight - 130}
          next={onScrollToBottom}
          hasMore={hasMore}
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
            photos={imageList}
            layout="rows"
            targetRowHeight={TARGET_ROW_HEIGHT}
            rowConstraints={ROW_CONSTRAINTS}
            spacing={PHOTO_SPACING}
            onClick={({ index }) => selectImage(index, imageList)}
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
            ref={inputRef}
          />
          <Button
            variant="flat"
            color="primary"
            isIconOnly
            onClick={() => inputRef.current.click()}
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
          <Input
            type="search"
            placeholder={t('input_search')}
            value={searchValue}
            onValueChange={setSearchValue}
            onKeyDown={(e) => onSearchKeydown(e)}
          />

          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                isIconOnly
                variant="flat"
                color="primary"
                onClick={() => {
                  fetchImage();
                }}
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
