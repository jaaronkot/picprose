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
import { AcmeLogo } from "./AcmeLogo";
import PhotoAlbum from "react-photo-album";
import InfiniteScroll from "react-infinite-scroll-component";

const PHOTO_SPACING = 8;
const TARGET_ROW_HEIGHT = 110;
const ROW_CONSTRAINTS = { maxPhotos: 2 };

export const LeftResourcePanel = (props) => {
  const [imageList, setImageList] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("dev");
  // const [isLoading, setIsLoading] = React.useState(Boolean);
  const inputRef = React.useRef(null);
  const [unsplashPage, setUnsplashPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

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

  const searchImages = (searchText: string) => {
    if (searchText === "") {
      return;
    }
    // setIsLoading(true);
    unsplash.search
      .getPhotos({
        query: searchText,
        page: unsplashPage,
        perPage: 20,
        // orientation:'portrait'
      })
      .then((result) => {
        if (result.type === 'success') {
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
              profile: `${item.user.links.html}?utm_source=https://picprose.net&utm_medium=referral`,
            };
          });
          if(photos.length < 20) {
            setHasMore(false)
          }
          setImageList([...imageList, ...photos]);
          // setIsLoading(false);
        } else {
            setHasMore(false)
        }
 

        
      });
  };

  const onSearchKeydown = (e) => {
    if (e.keyCode === 13) {
      fetchImage()
    }
  };

  const fetchImage = () => {
    // clear imagelist
    setImageList([])
    setUnsplashPage(1)
    setHasMore(true)
    searchImages(searchValue)
  };

  //
  const selectImage = (index) => {
    props.onData(imageList[index]);
  };

  React.useEffect(() => {
    searchImages(searchValue);
  }, [unsplashPage]);
 
  const fetchMoreData = () => {
    setUnsplashPage(unsplashPage + 1);
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
            <AcmeLogo />
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
      <div className="flex-grow">
      <InfiniteScroll
          className="overflow-y-scroll scrollbar-thin scrollbar-color-auto px-3"
          dataLength={imageList.length}
          height={640}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div className="grid justify-items-center ">
              <Spinner className="my-2"/>
            </div>}
          endMessage={
            <div className="grid justify-items-center ">
              <div className="my-2">
              已经到底...
              </div>
          </div>
          }
        >
          <PhotoAlbum
            photos={imageList}
            layout="rows"
            targetRowHeight={TARGET_ROW_HEIGHT}
            rowConstraints={ROW_CONSTRAINTS}
            spacing={PHOTO_SPACING}
            // defaultContainerWidth={330}
            onClick={({ index }) => selectImage(index)}
          />
        </InfiniteScroll>
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
            placeholder="输入关键词搜索图片"
            value={searchValue}
            onValueChange={setSearchValue}
            onKeyDown={(e) => onSearchKeydown(e)}
          />

          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                // isLoading={isLoading}
                isIconOnly
                variant="flat"
                color="primary"
                onClick={() => {fetchImage}
                }
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
