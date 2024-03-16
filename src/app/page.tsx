'use client'
import React from "react";
import {Listbox, ListboxItem, Chip, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import {RightListboxWrapper} from "./RightListboxWrapper";
import {users} from "./data";
import {ImageEditor} from "./ImageEditor";

export default function Home() {


  return (
    <div className="flex">
       <div className="w-52 bg-gray-200">
        <ListboxWrapper>
        </ListboxWrapper>
      </div>
      <div className="flex-1">
        <ImageEditor/>
      </div>
      <div className="w-80 bg-gray-320">
        <RightListboxWrapper>
        </RightListboxWrapper>
      </div>
        
    </div>
  );
}

