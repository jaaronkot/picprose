'use client'
import React from "react";
import { Tabs, Tab, Select, SelectItem, Accordion, AccordionItem, Card, Listbox, CardBody, ListboxItem, Chip, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import unsplash from "./unsplashConfig";
import { AcmeLogo } from "./AcmeLogo";

export const RightListboxWrapper = (props) => {


  const dowloadImage = (imgFormat: string) => {
    props.onImageDowloadClick(imgFormat)

  }
  const animals = [
    {label: "Cat", value: "cat", description: "The second most popular pet in the world"},
    {label: "Dog", value: "dog", description: "The most popular pet in the world"},
    {label: "Elephant", value: "elephant", description: "The largest land animal"},
    {label: "Lion", value: "lion", description: "The king of the jungle"},
    {label: "Tiger", value: "tiger", description: "The largest cat species"},
    {label: "Giraffe", value: "giraffe", description: "The tallest land animal"},
    {
      label: "Dolphin",
      value: "dolphin",
      description: "A widely distributed and diverse group of aquatic mammals",
    },
    {label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds"},
    {label: "Zebra", value: "zebra", description: "A several species of African equids"},
    {
      label: "Shark",
      value: "shark",
      description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    },
    {
      label: "Whale",
      value: "whale",
      description: "Diverse group of fully aquatic placental marine mammals",
    },
    {label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"},
    {label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile"},
  ];
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
        <Select
          label="Select an animal"
          className="max-w-xs"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>

        <Accordion>
          <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
            {11}
          </AccordionItem>

        </Accordion>
        <Accordion>
          <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
            {11}
          </AccordionItem>

        </Accordion>
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

