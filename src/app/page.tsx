'use client'
import React from "react";
import { Listbox, ListboxItem, Chip, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { ListboxWrapper } from "./ListboxWrapper";
import { RightListboxWrapper } from "./RightListboxWrapper";
import { users } from "./data";
import { ImageEditor } from "./ImageEditor";
import { ComponentToImg } from "./ComponentToImg";

export default function Home() {
  const child1Ref = React.useRef(null);
  const [message, setMessage] = React.useState({});
  const onChildData = (data: {}) => {
    setMessage(data)
  }
  const onImageDowloadClick = (imgFormat: string) => {
    child1Ref.current.downloadImage(imgFormat)
  }


  return (
    <div className="flex">
      <div className="w-80 bg-gray-200">
        <ListboxWrapper onData={onChildData} />
      </div>
      <div className="flex-1" >
        <ComponentToImg ref={child1Ref}  >
          <ImageEditor message={message} />
        </ComponentToImg>

      </div>
      <div className="w-80 bg-gray-320">
        <RightListboxWrapper onImageDowloadClick={onImageDowloadClick} />
      </div>

    </div>
  );
}

