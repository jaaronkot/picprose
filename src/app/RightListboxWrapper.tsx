'use client'
import React from "react";
import { Tabs, Tab, Card, Listbox, CardBody, ListboxItem, Chip, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import unsplash from "./unsplashConfig";
import { AcmeLogo } from "./AcmeLogo";

export const RightListboxWrapper = (props) => {
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
    <div className="w-full max-w-[w-80] h-screen bg-slate-800">
      <Tabs fullWidth size="md" aria-label="Dynamic tabs" radius='sm'
      >
        <Tab key="property" title="属性">
        </Tab>
        <Tab key="photos" title="图库">
          <div className="w-full flex flex-col bg-slate-800">
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
                    <Button onClick={() => searchImages("dog")}>
                      <svg className="w-9 h-9 ml-auto mr-1 p-2 bg-gray-700 hover:bg-gray-800 text-white rounded-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </Button>
                  </NavbarItem>
                </NavbarContent>
              </Navbar>
            </div>
            <Listbox
              className="h-96 overflow-scroll"
              items={imageList}
              label="Assigned to"
              selectionMode="none"
              onSelectionChange={setValues}
              variant="flat"
              aria-label="Actions"
            >
              {(item) => (
                <ListboxItem key={item.id} textValue={item.alt_description}>
                  <div className="flex gap-2 items-center">
                    <img src={item.urls.regular}
                      key={item.id}
                      alt={item.alt_description}
                      className="rounded cursor-pointer w-full object-cover h-44"
                      onClick={() => selectImage(item)
                      }
                    />

                  </div>
                </ListboxItem>
              )}
            </Listbox>

          </div>
        </Tab>

      </Tabs>

    </div>
  )
};

