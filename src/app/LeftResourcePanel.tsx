'use client'
import React from "react";
import { Input, ListboxItem, Chip, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import unsplash from "./unsplashConfig";
import { SearchIcon } from "./SearchIcon";

export const LeftResourcePanel = (props) => {
  const [values, setValues] = React.useState(new Set(["1"]));

  const [imageList, setImageList] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(Boolean);
 
  const [unsplashImage, setUnsplashImage] = React.useState({
    url: "",
    name: "",
    avatar: "",
    profile: "",
    downloadLink: ""
  });

 
  const searchImages = (searchText: string) => {
    setIsLoading(true)
    unsplash.search
      .getPhotos({
        query: searchText,
        page: 1,
        per_page: 30,
        // orientation:'portrait'


      })
      .then(response => {
        setIsLoading(false)
        setImageList(response.response.results)
      });
  }

  // 
  const selectImage = (image) => {
    props.onData({
      url: image.urls.regular,
      name: image.user.name,
      avatar: image.user.profile_image.small,
      profile: `${image.user.links.html}?utm_source=https://coverview.vercel.app&utm_medium=referral`,
      downloadLink: image.links.download_location
    })
  }

  React.useEffect(() => {
    searchImages('dev')
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
            <p className="font-bold text-inherit">Any Cover</p>
          </NavbarBrand>

          <NavbarContent justify="end">
            <NavbarItem>
            <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
      <div className="flex-grow overflow-y-scroll overflow-x-hidden justify-center flex flex-wrap scrollbar-thin scrollbar-color-auto">
        {
          imageList.map(image => {
            return <img src={image.urls.regular}
              key={image.id}
              alt={image.alt_description}
              className="rounded m-2 cursor-pointer w-5/12 object-cover h-24"
              onClick={() => selectImage(image)
              }
            />
          })
        }
      </div>
      <div className="w-full">
        <Navbar
          classNames={{
            wrapper: "px-4",
          }}
        >
     
          <Input
           type="search" 
          placeholder="输入关键词搜索图片"
          value = {searchValue}
          onValueChange={setSearchValue}
           />
       
          <NavbarContent justify="end">
            <NavbarItem>
              <Button isLoading={isLoading} isIconOnly color="primary" href="#" variant="flat" onClick={() => searchImages(searchValue)}>
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
    </div>
  )
};