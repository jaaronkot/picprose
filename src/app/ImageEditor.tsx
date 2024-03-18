'use client'
import React from "react";
import unsplash from "./unsplashConfig";

import { Listbox, Divider, ListboxItem, Chip, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
const titleStr = "海内存知己，天涯若比邻"
const authorStr = "@PixPark"
export const ImageEditor = (props) => {

  return (
    <>
      {props.message ?
        <div className="flex justify-center items-center h-full w-full px-10">
          <div className='relative flex group rounded-3xl'>
            <div className="flex justify-center items-center h-full">
              <img src={props.message.url && props.message.url} alt="Image" className="rounded-md aspect-video object-cover w-full" />
            </div>

            <div className="backdrop-blur-sm bg-gray-800/60 absolute top-0 right-0 left-0 rounded-md h-full">
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
                <h1 className=" md:text-5xl text-center text-2xl font-bold text-white">{titleStr}</h1>
                <div className="flex flex-col items-center py-10  ">

                  <h2 className="text-xl  font-semibold text-left text-white ">{authorStr}</h2>
                  {
                    // customIcon ?
                    //   <div className=" ">
                    //     <img src={customIcon} alt="img" className="w-12 h-12 m-2 rounded-full bg-white border-2 border-white" />
                    //   </div>
                    //   :
                      <div className="mr-2 items-center justify-center flex">
                        <i className={`devicon-jaegertracing-plain text-white dev-icon text-4xl`}></i>
                      </div>
                  }

                </div>
              </div>
            </div>

            <div className="absolute  bottom-4 right-4 opacity-80">
              <div className=" group-hover:flex hidden items-center">
                <span className="text-sm text-white mx-2">Photo by</span>
                <a href={props.message.profile} target="_blank" rel="noreferrer" className="cursor-pointer flex items-center bg-gray-300 rounded-full text-sm">
                  <img src={props.message.avatar && props.message.avatar} alt={props.message.name} className="h-6 w-6 rounded-full mr-2" />
                  <span className="pr-2">{props.message.name}</span>
                </a>

                <a href="https://unsplash.com/?utm_source=https://coverview.vercel.app&utm_medium=referral" className="text-sm text-white mx-2">Unsplash</a>
              </div>

            </div>
          </div>
        </div> : <div>"gegeg"</div>}


    </>
  )
};
