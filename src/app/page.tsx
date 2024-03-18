'use client'
import React from "react";
import {Listbox, ListboxItem, Chip, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import {RightListboxWrapper} from "./RightListboxWrapper";
import {users} from "./data";
import {ImageEditor} from "./ImageEditor";

export default function Home() {
  const onChildData = (data:{}) => {
    console.log('message from child ' + data.url);
    setMessage(data)
  }
  const [message, setMessage] = React.useState('');
  return (
    <div className="flex">
       <div className="w-52 bg-gray-200">
        <ListboxWrapper>
        </ListboxWrapper>
      </div>
      <div className="flex-1" >
        <ImageEditor message={message}/>
      </div>
      <div className="w-80 bg-gray-320">
        <RightListboxWrapper onData={onChildData}>
        </RightListboxWrapper>
      </div>
        
    </div>
  );
}

