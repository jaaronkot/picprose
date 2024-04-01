'use client'
import React from "react";
import "./devicon.css" 
import { Listbox, Divider, ListboxItem, Chip, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export const ImageEditor = (props) => {
  const { aspect, blur, title, subTitle, author, icon, devicon, font, color } = props.propertyInfo;

  const getImageInfo = () => {
    return (props.message.url ? props.message : {
      url: "default-bg.jpg",
      name: "PicProse",
      avatar: "default-author.jpg",
      profile: "default",
      downloadLink: ""
    });
  }

  const getTitle = () => {
    if(title.length != 0) {
      return title
    } else {
      return '海内存知己，天涯若比邻'
    }
  }

  const getAuthor = () => {
    if(author.length != 0) {
      return author
    } else {
      return '@PicProse'
    }
  }
  
  const getIcon = () => {
    if (devicon.length != 0) {
      return (<div className="m-4 items-center justify-center flex">
        <i className={`devicon-${devicon}-plain text-white dev-icon text-4xl`}></i>
      </div>)
    } else {
      return (<div className=" ">
        <img src={icon} alt="img" className="w-12 h-12 m-2 rounded-full bg-white border-2 border-white" />
      </div>)
    } 
  }

  const [customIcon, setCustomIcon] = React.useState('')

  return (
    <div className="flex flex-row  items-center bg-white justify-center">
      <div className="w-full">
        <div className='relative flex group rounded-3xl'>
          <div className="flex justify-center items-center h-full">
            <img src={getImageInfo().url && getImageInfo().url} alt="Image" className={"rounded-md object-cover w-full aspect-[16/9] " + aspect} />
          </div>

          <div className={"bg-gray-800/60 absolute top-0 right-0 left-0 rounded-md h-full " + blur}>
            <button
              className="absolute  top-2 right-2 cursor-pointer">
              <svg className="group-hover:inline-block hidden w-8 h-8 text-gray-800 bg-white p-2 rounded-full z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>

            </button>

            <div className={' px-10 pt-32  text-left rounded-xl h-full p-4 flex flex-col'}>
              <h1 className={"md:text-5xl text-center text-2xl font-bold  text-white " + font}>{getTitle()}</h1>
              <div className="flex flex-col items-center py-10  ">
                <h2 className={"text-xl font-semibold text-left text-white " + font}>{getAuthor()}</h2>
                {getIcon()}
              </div>
            </div>
          </div>

          <div className="absolute  bottom-4 right-4 opacity-80">
            <div className=" group-hover:flex hidden items-center">
              <span className="text-sm text-white mx-2">Photo by</span>
              <a href={getImageInfo().profile} target="_blank" rel="noreferrer" className="cursor-pointer flex items-center bg-gray-300 rounded-full text-sm">
                <img src={getImageInfo().avatar && getImageInfo().avatar} alt={getImageInfo().name} className="h-6 w-6 rounded-full mr-2" />
                <span className="pr-2">{getImageInfo().name}</span>
              </a>

              <a href="https://unsplash.com/?utm_source=https://picprose.pixpark.net&utm_medium=referral" className="text-sm text-white mx-2">Unsplash</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
};
