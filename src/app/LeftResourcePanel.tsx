'use client'
import React from "react";
import { Input, ListboxItem, Chip, ScrollShadow, Avatar, AvatarIcon, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import unsplash from "./unsplashConfig";
import { SearchIcon } from "./SearchIcon";
import { AcmeLogo } from "./AcmeLogo";
export const LeftResourcePanel = (props) => {
  
  const [imageList, setImageList] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(Boolean);
 
  const searchImages = (searchText: string) => {
    setIsLoading(true)
    unsplash.search
      .getPhotos({
        query: searchText,
        page: 1,
        perPage: 30,
        // orientation:'portrait'
      })
      .then(response => {
        setIsLoading(false)
        setImageList(response.response.results)
      });
  }

  const onSearchKeydown = (e)=>{
		if (e.keyCode === 13) {
      searchImages(searchValue)
		}
	}

  // 
  const selectImage = (image) => {
    props.onData({
      url: image.urls.regular,
      name: image.user.name,
      avatar: image.user.profile_image.small,
      profile: `${image.user.links.html}?utm_source=https://picprose.net&utm_medium=referral`,
      downloadLink: image.links.download_location
    })
  }

  React.useEffect(() => {
    searchImages('scenery')
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
            <AcmeLogo/>
            <p className="font-bold text-inherit">PicProse</p>
          </NavbarBrand>

          <NavbarContent justify="end">
            <NavbarItem>
            <Avatar  className="text-[#2F6EE7]" icon={<AvatarIcon />}/>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
      <div className="flex-grow overflow-y-scroll overflow-x-hidden justify-center flex flex-wrap scrollbar-thin scrollbar-color-auto">
        {
          imageList.map(image => {
            return <img src={image.urls.small}
              key={image.id}
              alt={image.alt_description}
              className="transition-transform duration-200 transform hover:scale-105 rounded m-2 cursor-pointer w-5/12 object-cover h-24"
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
          onKeyDown={(e)=> onSearchKeydown(e)}
           />
       
          <NavbarContent justify="end">
            <NavbarItem>
              <Button isLoading={isLoading} isIconOnly variant="flat" color="primary" onClick={() => searchImages(searchValue)}>
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-450 pointer-events-none flex-shrink-0" />
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
    </div>
  )
};