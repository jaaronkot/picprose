'use client'
import React from "react";
import {Listbox, ListboxItem, Chip, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import {RightListboxWrapper} from "./RightListboxWrapper";
import {users} from "./data";
import {ImageEditor} from "./ImageEditor";
import {ComponentToImg} from "./ComponentToImg";

export default function Home() {
  const [message, setMessage] = React.useState({});
  const onChildData = (data:{}) => {
    setMessage(data)
  }

  return (
    <div className="flex">
       <div className="w-80 bg-gray-200">
        <ListboxWrapper onData={onChildData}>
        </ListboxWrapper>
      </div>
      <div className="flex-1" >
      <ComponentToImg>
        <ImageEditor message={message}/>
      </ComponentToImg>
       
      </div>
      <div className="w-80 bg-gray-320">
        <RightListboxWrapper>
        </RightListboxWrapper>
      </div>
        
    </div>
  );
}

