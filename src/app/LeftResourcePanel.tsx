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
  Link,
  Button,
} from "@nextui-org/react";
import unsplash from "./unsplashConfig";
import { SearchIcon } from "./SearchIcon";
import { AcmeLogo } from "./AcmeLogo";
export const LeftResourcePanel = (props) => {
  const [imageList, setImageList] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(Boolean);
  const inputRef = React.useRef(null);

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
    setIsLoading(true);
    unsplash.search
      .getPhotos({
        query: searchText,
        page: 1,
        perPage: 30,
        // orientation:'portrait'
      })
      .then((response) => {
        setIsLoading(false);
        setImageList(response.response.results);
      });
  };

  const onSearchKeydown = (e) => {
    if (e.keyCode === 13) {
      searchImages(searchValue);
    }
  };

  //
  const selectImage = (image) => {
    props.onData({
      url: image.urls.regular,
      name: image.user.name,
      avatar: image.user.profile_image.small,
      profile: `${image.user.links.html}?utm_source=https://picprose.net&utm_medium=referral`,
      downloadLink: image.links.download_location,
    });
  };

  React.useEffect(() => {
    searchImages("scenery");
  }, []);

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
      <div className="flex-grow overflow-y-scroll overflow-x-hidden justify-center flex flex-wrap scrollbar-thin scrollbar-color-auto">
        {imageList.map((image) => {
          return (
            <img
              src={image.urls.small}
              key={image.id}
              alt={image.alt_description}
              className="transition-transform duration-200 transform hover:scale-105 rounded m-2 cursor-pointer w-5/12 object-cover h-24"
              onClick={() => selectImage(image)}
            />
          );
        })}
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.3"
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
                isLoading={isLoading}
                isIconOnly
                variant="flat"
                color="primary"
                onClick={() => searchImages(searchValue)}
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
