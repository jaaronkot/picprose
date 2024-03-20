'use client'
import React from "react";
import { Tabs, Tab, Select, SelectItem, Selection, SelectSection, Input, Divider, Slider, Accordion, AccordionItem, Card, Listbox, CardBody, ListboxItem, Textarea, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import unsplash from "./unsplashConfig";
import { AcmeLogo } from "./AcmeLogo";

export const RightPropertyPanel = (props) => {
 
  const [titleValue, setTitleValue] = React.useState("海内存知己，天涯若比邻");
  const [subTitleValue, setSubTitleValue] = React.useState("");
  const [authorValue, setAuthorValue] = React.useState("@PixPark");
  const [iconValue, setIconValue] = React.useState("");
  const [aspectValue, setAspectValue] = React.useState("aspect-[16/9]");

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIconValue(e.target.value);
  };

  const handleAspectSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAspectValue(e.target.value);
  };
 
  const [propertyInfo, setPropertyInfo] = React.useState({
    font: "",
    title: "",
    subTitle: "",
    author: "",
    icon: "",
    color: "",
    aspect: "",
    blur: 0
  });

  React.useEffect(() => {
    setPropertyInfo(preValue => ({
      ...preValue,
      author: authorValue
    }));
  }, [authorValue]);

  React.useEffect(() => {
    setPropertyInfo(preValue => ({
      ...preValue,
      title: titleValue
    }));
  }, [titleValue]);

  React.useEffect(() => {
    setPropertyInfo(preValue => ({
      ...preValue,
      icon: iconValue
    }));
  }, [iconValue]);


  React.useEffect(() => {
    setPropertyInfo(preValue => ({
      ...preValue,
      aspect: aspectValue
    }));
  }, [aspectValue]);

  React.useEffect(() => {
    props.onPropInfoChange(propertyInfo);
  }, [propertyInfo]);


  const dowloadImage = (imgFormat: string) => {
    props.onImageDowloadClick(imgFormat)

  }

  const img_aspect_x_list = [
    // 横屏
    { label: "1:1", value: "aspect-[1/1]", description: "900x450" },
    { label: "2:1", value: "aspect-[2/1]", description: "900x450" },
    { label: "3:2", value: "aspect-[3/2]", description: "900x450" },
    { label: "4:3", value: "aspect-[4/3]", description: "900x450" },
    { label: "16:9", value: "aspect-[16/9]", description: "900x450" },
  ]

  const img_aspect_y_list = [
    //  竖屏
    { label: "1:2", value: "6", description: "900x450" },
    { label: "2:3", value: "7", description: "900x450" },
    { label: "3:4", value: "8", description: "900x450" },
    { label: "9:16", value: "9", description: "900x450" },
  ]


  const animals = [
    { label: "Cat", value: "cat", description: "The second most popular pet in the world" },
    { label: "Dog", value: "dog", description: "The most popular pet in the world" },
    { label: "Elephant", value: "elephant", description: "The largest land animal" },
    { label: "Lion", value: "lion", description: "The king of the jungle" },
    { label: "Tiger", value: "tiger", description: "The largest cat species" },
    { label: "Giraffe", value: "giraffe", description: "The tallest land animal" },
    {
      label: "Dolphin",
      value: "dolphin",
      description: "A widely distributed and diverse group of aquatic mammals",
    },
    { label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds" },
    { label: "Zebra", value: "zebra", description: "A several species of African equids" },
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
    { label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae" },
    { label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile" },
  ];
  return (
    <div className="w-full flex flex-col h-screen">
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
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
      <div className="flex-grow justify-center flex flex-wrap px-4">
        <Select
          label="比例"
          className="max-w-xs"
          defaultSelectedKeys={["aspect-[16/9]"]}
          onChange={handleAspectSelectionChange}
        >
          <SelectSection showDivider title="横屏">
            {img_aspect_x_list.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label + "  -   " + item.description}
              </SelectItem>
            ))}
          </SelectSection>
          <SelectSection showDivider title="竖屏">
            {img_aspect_y_list.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label + "  -   " + item.description}
              </SelectItem>
            ))}
          </SelectSection>
        </Select>

        <Slider
          label="模糊"

          size="sm"
          step={10}
          marks={[
            {
              value: 20,
              label: "20%",
            },
            {
              value: 50,
              label: "50%",
            },
            {
              value: 80,
              label: "80%",
            },
          ]}
          defaultValue={20}
          className="max-w-md"
        />
        <Divider />
        <Select
          label="图标"
          className="max-w-xs"
          onChange={handleSelectionChange}
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>


        <Select
          label="字体"
          className="max-w-xs"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>


        <Select
          label="颜色"
          className="max-w-xs"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
        <Divider />
        <Textarea
          label="标题"
          placeholder="Enter your description"
          className="max-w-xs"
          value={titleValue}
          onValueChange={setTitleValue}
        />

        <Input
          label="作者"
          type="search"
          placeholder="@PixPark"
          value={authorValue}
          onValueChange={setAuthorValue}

        />
      </div>
      <Divider />
      <div className="w-full mt-4 px-4">

        <div className="text-gray-400 text-sm">下载图像</div>
        <div className="flex justify-between my-3">
          <Button onClick={() => dowloadImage("jpg")} as={Link} color="primary" href="#" variant="flat">
            JPG
          </Button>
          <Button onClick={() => dowloadImage("png")} as={Link} color="primary" href="#" variant="flat">
            PNG
          </Button>
          <Button onClick={() => dowloadImage("svg")} as={Link} color="primary" href="#" variant="flat">
            SVG
          </Button>
        </div>
      </div>
    </div>

  )
};