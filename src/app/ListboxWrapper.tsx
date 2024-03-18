'use client'
import React from "react";
import { Listbox, ListboxItem, Chip, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import unsplash from "./unsplashConfig";
import { AcmeLogo } from "./AcmeLogo";

export const ListboxWrapper = (props) => {
  const [values, setValues] = React.useState(new Set(["1"]));

  const [imageList, setImageList] = React.useState([]);

  interface ImgContext {
    url: string;
    name: string;
    avatar: string;
    profile: string;
    downloadLink: string;
  }

  const [unsplashImage, setUnsplashImage] = React.useState<ImgContext>({
    url: "",
    name: "",
    avatar: "",
    profile: "",
    downloadLink: ""
  });


  const searchImages = (searchText: string) => {
    console.log('sssssssss')
    unsplash.search
      .getPhotos({
        query: searchText,
        page: 1,
        per_page: 30,
        // orientation:'portrait'


      })
      .then(response => {
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

  return (
    <div className="w-full flex flex-col h-screen bg-slate-800">
      <div className="bg-gray-500 w-full">
        <Navbar
          classNames={{
            wrapper: "px-4",
          }}
        >
          <NavbarBrand>
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>

          <NavbarContent justify="end">
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
      <div className="flex-grow scrollbar-thin scrollbar-width: thin overflow-y-scroll overflow-x-hidden justify-center flex flex-wrap ">
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
          <NavbarBrand>
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>

          <NavbarContent justify="end">
            <NavbarItem>
              <Button onClick={() => searchImages("dev")} as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
    </div>
  )
};