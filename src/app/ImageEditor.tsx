'use client'
import React from "react";
import unsplash from "./unsplashConfig";
 
import { Listbox, ListboxItem, Chip, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export const ImageEditor = () => {

  const [imageList, setImageList] = React.useState([]);
  const [count, setCount] = React.useState(0);

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
    
    setUnsplashImage({
      url: image.urls.regular,
      name: image.user.name,
      avatar: image.user.profile_image.small,
      profile: `${image.user.links.html}?utm_source=https://coverview.vercel.app&utm_medium=referral`,
      downloadLink: image.links.download_location
    })
    console.log("5566666")
    setCount(1);
  }

  const topContent = React.useMemo(() => {
    if (!unsplashImage) {
      console.log("gezhahhhh")
      return null;
    }
    console.log("22222222")
    return (
      <div className='relative flex group'>
        
      <div className="h-max w-full ">
        <img src={unsplashImage.url && unsplashImage.url} className=" object-cover h-full w-full  " alt="preview" />
      </div>


      <div className=" backdrop-blur-sm h-full bg-gray-800/60 absolute top-0 right-0 left-0 ">
        <button
          onClick={() => setUnsplashImage('')}
          className="absolute  top-2 right-2 cursor-pointer">
          <svg className="group-hover:inline-block hidden w-8 h-8 text-gray-800 bg-white p-2 rounded-full z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>

        </button>

      </div>

      <div className="absolute  bottom-4 right-4 opacity-80">
        <div className=" group-hover:flex hidden items-center">
          <span className="text-sm text-white mx-2">Photo by</span>
          <a href={unsplashImage.profile} target="_blank" rel="noreferrer" className="cursor-pointer flex items-center bg-gray-300 rounded-full text-sm">
            <img src={unsplashImage.avatar && unsplashImage.avatar} alt={unsplashImage.name} className="h-6 w-6 rounded-full mr-2" />

            <span className="pr-2">{unsplashImage.name}</span>
          </a>

          <a href="https://unsplash.com/?utm_source=https://coverview.vercel.app&utm_medium=referral" className="text-sm text-white mx-2">Unsplash</a>
        </div>

      </div>
    </div>
    );
  }, [1]);

  return (
    <>
      <Button type="submit" onClick={() => searchImages("dog")}>
        <svg className="w-9 h-9 ml-auto mr-1 p-2 bg-gray-700 hover:bg-gray-800 text-white rounded-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </Button>
      <div className="overflow-y-scroll overflow-x-hidden h-96 justify-center flex flex-wrap">
        {
          imageList.map(image => {
            return <img src={image.urls.regular}
              key={image.id}
              alt={image.alt_description}
              className="rounded m-2 cursor-pointer w-2/12 object-cover h-40"
              onClick={() => selectImage(image)
              }
            />
          })
        }
      </div>
    
        {count > 0?  <div className='relative flex group'>
        
        <div className="h-max w-full ">
          <img src={unsplashImage.url && unsplashImage.url} className=" object-cover h-full w-full  " alt="preview" />
        </div>
  
  
        <div className=" backdrop-blur-sm h-full bg-gray-800/60 absolute top-0 right-0 left-0 ">
          <button
            onClick={() => setUnsplashImage({
              url: "",
              name: "",
              avatar: "",
              profile: "",
              downloadLink: ""
            })}
            className="absolute  top-2 right-2 cursor-pointer">
            <svg className="group-hover:inline-block hidden w-8 h-8 text-gray-800 bg-white p-2 rounded-full z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>

          </button>

          <div className={'px-10 pt-32  text-left rounded-xl h-full p-4 flex flex-col'}>
            <h1 className=" md:text-5xl text-center text-2xl font-bold text-white">{"gzhaoyou1"}</h1>
            <div className="flex flex-col items-center py-10  ">

              <h2 className="text-xl  font-semibold text-left text-white ">{"@pixpark"}</h2>
              {
                // customIcon ?
                //   <div className=" ">
                //     <img src={customIcon} alt="img" className="w-12 h-12 m-2 rounded-full bg-white border-2 border-white" />
                //   </div>
                //   :
                //   <div className="mr-2 items-center justify-center flex">
                //     <i className={`devicon-${icon.value}-plain text-white dev-icon text-3xl`}></i>
                //   </div>
              }

            </div>
          </div>
        </div>
  
        <div className="absolute  bottom-4 right-4 opacity-80">
          <div className=" group-hover:flex hidden items-center">
            <span className="text-sm text-white mx-2">Photo by</span>
            <a href={unsplashImage.profile} target="_blank" rel="noreferrer" className="cursor-pointer flex items-center bg-gray-300 rounded-full text-sm">
              <img src={unsplashImage.avatar && unsplashImage.avatar} alt={unsplashImage.name} className="h-6 w-6 rounded-full mr-2" />
  
              <span className="pr-2">{unsplashImage.name}</span>
            </a>
  
            <a href="https://unsplash.com/?utm_source=https://coverview.vercel.app&utm_medium=referral" className="text-sm text-white mx-2">Unsplash</a>
          </div>
  
        </div>
      </div> :  <div>gezhaoyou111</div>}
    
       
    </>
  )
};
