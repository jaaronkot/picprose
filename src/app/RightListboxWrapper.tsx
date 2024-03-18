'use client'
import React from "react";
import { Tabs, Tab, Card, Listbox, CardBody, ListboxItem, Chip, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import unsplash from "./unsplashConfig";
import { AcmeLogo } from "./AcmeLogo";

export const RightListboxWrapper = (props) => {
 

  const dowloadImage = (imgFormat: string) => {
    props.onImageDowloadClick(imgFormat)
     
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
              <Button onClick={() => dowloadImage("png")} as={Link} color="primary" href="#" variant="flat"
              className="mr-14">
                PNG
              </Button>
              <Button onClick={() => dowloadImage("jpg")} as={Link} color="primary" href="#" variant="flat"
              className="mr-14"
              >
                JPG
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
    </div>
       
  )
};

