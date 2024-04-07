"use client";
import React from "react";
import "./devicon.min.css";
import {
  Listbox,
  Divider,
  ListboxItem,
  Chip,
  ScrollShadow,
  Avatar,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export const ImageEditor = (props) => {
  const {
    aspect,
    blur,
    blurTrans,
    title,
    subTitle,
    author,
    icon,
    devicon,
    font,
    color,
    logoPosition,
  } = props.propertyInfo;

  const getImageInfo = () => {
    return props.message.url
      ? props.message
      : {
          url: "default-bg.jpg",
          name: "PicProse",
          avatar: "default-author.jpg",
          profile: "default",
          downloadLink: "",
        };
  };

  const getTitle = () => {
    if (title.length != 0) {
      return title;
    } else {
      return "Why UI designers should understand Flexbox and CSS Grid";
    }
  };

  const getAuthor = () => {
    if (author.length != 0) {
      return author;
    } else {
      return "@PicProse";
    }
  };

  const getIcon = () => {
    if (devicon.length != 0) {
      return (
        <div className="m-4 items-center justify-center flex">
          <i className={`devicon-${devicon} text-white dev-icon text-4xl`}></i>
        </div>
      );
    } else {
      return (
        <div className=" ">
          <img
            src={icon}
            alt="img"
            className="w-12 h-12 m-2 rounded-full bg-white border-2 border-white"
          />
        </div>
      );
    }
  };

  const [customIcon, setCustomIcon] = React.useState("");

  return (
    <div className="max-h-screen relative flex group rounded-3xl">
      <div style={{ maxHeight: "90vh" }} className={aspect}>
        <img
          src={getImageInfo().url && getImageInfo().url}
          alt="Image"
          className={"rounded-md object-cover h-full w-full"}
        />
      </div>

      <div
        style={{ backgroundColor: color + blurTrans }}
        className={"absolute top-0 right-0 left-0 rounded-md h-full " + blur}
      >
        <button className="absolute  top-2 right-2 cursor-pointer">
          <svg
            className="group-hover:inline-block hidden w-8 h-8 text-gray-800 bg-white p-2 rounded-full z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"
            />
          </svg>
        </button>
        <div className="flex justify-center items-center h-full w-full">
          <div>
            <div
              className={"px-10 text-left rounded-xl h-full p-4 flex flex-col"}
            >
              <h1
                draggable="true"
                className={
                  " leading-tight text-center text-5xl font-bold  text-white " +
                  font
                }
              >
                {getTitle()}
              </h1>
              <div className="flex flex-col items-center pt-10  ">
                <h2
                  className={
                    "text-xl font-semibold text-left text-white " + font
                  }
                >
                  {getAuthor()}
                </h2>
                {logoPosition == "default" && getIcon()}
              </div>
            </div>
          </div>
        </div>
        <div className={"absolute " + logoPosition}>
          {logoPosition != "default" && getIcon()}
        </div>
      </div>

      <div className="absolute  bottom-4 right-4 opacity-80">
        <div className=" group-hover:flex hidden items-center">
          <span className="text-sm text-white mx-2">Photo by</span>
          <a
            href={getImageInfo().profile}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer flex items-center bg-gray-300 rounded-full text-sm"
          >
            <img
              src={getImageInfo().avatar && getImageInfo().avatar}
              alt={getImageInfo().name}
              className="h-6 w-6 rounded-full mr-2"
            />
            <span className="pr-2">{getImageInfo().name}</span>
          </a>

          <a
            href="https://unsplash.com/?utm_source=https://picprose.pixpark.net&utm_medium=referral"
            className="text-sm text-white mx-2"
          >
            Unsplash
          </a>
        </div>
      </div>
    </div>
  );
};
