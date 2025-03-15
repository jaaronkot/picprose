"use client";
import React from "react";
import {
  Tabs,
  Tab,
  Select,
  SelectItem,
  SliderValue,
  Selection,
  SelectSection,
  Input,
  Divider,
  Slider,
  Accordion,
  AccordionItem,
  Card,
  Listbox,
  CardBody,
  ListboxItem,
  Textarea,
  ScrollShadow,
  Avatar,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import unsplash from "./unsplashConfig";
import { TwitterPicker, CirclePicker } from "react-color";
import { deviconList } from "./devicon";
import { TopLeftIcon } from "./icons/TopLeftIcon";
import { BottomLeftIcon } from "./icons/BottomLeftIcon";
import { MiddleIcon } from "./icons/MiddleIcon";
import { BottomRightIcon } from "./icons/BottomRightIcon";
import { TopRightIcon } from "./icons/TopRightIcon";
import { config } from "@/config";
import { useTranslations } from "next-intl";
import { usePicprose } from "./PicproseContext";

export const RightPropertyPanel = () => {
  const t = useTranslations("RightPropertyPanel");
  const { propertyInfo, updateProperty, downloadImage } = usePicprose();
  
  const titleOptions = config.title;
  const iconInputRef = React.useRef(null);
  const fontInputRef = React.useRef(null);

  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      updateProperty("icon", file);
      updateProperty("devicon", "");
    }
  };

  const loadFont = (fontName: string, fontUrl: string) => {
    const font = new FontFace(fontName, `url(${fontUrl})`);
    font
      .load()
      .then(() => {
        document.fonts.add(font);
        document.documentElement.style.setProperty("--font-custom", fontName);
      })
      .catch((error) => {
        console.error("Font loading failed:", error);
      });
  };

  const handleFontUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      loadFont("--font-custom", file);
      updateProperty("font", "font-custom");
    }
  };

  const handleAspectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateProperty("aspect", e.target.value);
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateProperty("font", e.target.value);
  };

  const handleColorChange = (color: any) => {
    updateProperty("color", color.hex.toUpperCase());
  };

  const handleBlurLevelChange = (level: any) => {
    updateProperty("backBlurLevel", level);
  };

  const handleDeviconChange = (selection: Selection) => {
    let icon = "";
    if (selection && selection.size > 0) {
      icon = Array.from(selection)[0].toString();
    }
    updateProperty("devicon", icon);
  };

  const handleBlurTransChange = (value: SliderValue) => {
    updateProperty("blurTrans", value.toString());
  };

  const handleIconButtonClick = () => {
    if (iconInputRef.current) {
      iconInputRef.current.click();
    }
  };

  const handleFontButtonClick = () => {
    if (fontInputRef.current) {
      fontInputRef.current.click();
    }
  };

  const colorBackgroundStyle = {
    fontSize: "20px",
    backgroundColor: propertyInfo.color,
    borderWidth: "6px",
    borderColor: "#E9E9EB",
  };

  const handleImageDownload = (format: string) => {
    downloadImage(format);
  };

  const horizontalAspectOptions = [
    { label: "1 : 1", value: "aspect-square", description: "900x450" },
    { label: "2 : 1", value: "aspect-[2/1]", description: "900x450" },
    { label: "3 : 2", value: "aspect-[3/2]", description: "900x450" },
    { label: "4 : 3", value: "aspect-[4/3]", description: "900x450" },
    { label: "16: 9", value: "aspect-[16/9]", description: "900x450" },
  ];

  const verticalAspectOptions = [
    { label: "1:2", value: "aspect-[1/2]", description: "900x450" },
    { label: "2:3", value: "aspect-[2/3]", description: "900x450" },
    { label: "3:4", value: "aspect-[3/4]", description: "900x450" },
    { label: "9:16", value: "aspect-[9/16]", description: "900x450" },
  ];

  const fontOptions = [
    {
      label: "Font-DingTalk",
      value: "font-dingtalk",
      description: "The largest land animal",
    },
    {
      label: "Font-Alibaba",
      value: "font-alibaba",
      description: "The largest land animal",
    },
    {
      label: "Font-OpenSans",
      value: "font-opensans",
      description: "The largest land animal",
    },
    {
      label: "Font-Anke",
      value: "font-anke",
      description: "The second most popular pet in the world",
    },
    {
      label: "Font-Roboto",
      value: "font-roboto-mono",
      description: "The most popular pet in the world",
    },
    {
      label: "Font-KingSoft",
      value: "font-kingsoft",
      description: "The largest land animal",
    },
    {
      label: "Font-XinYiGuanHei",
      value: "font-xinyiguanhei",
      description: "The largest land animal",
    },
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
            <p className="text-gray-350 font-bold text-inherit">
              {t("property")}
            </p>
          </NavbarBrand>

          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                variant="flat"
                target="_blank"
                href="https://github.com/jaaronkot/picprose"
              >
                <i
                  className={`devicon-github-plain text-[#2F6EE7] dev-icon text-xl`}
                />
                GitHub
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
      <div className="flex-grow overflow-y-scroll overflow-x-hidden justify-center flex flex-wrap px-4">
        <Select
          label={t("aspect")}
          className="max-w-xs py-2"
          defaultSelectedKeys={["aspect-[16/9]"]}
          onChange={handleAspectChange}
          selectedKeys={[propertyInfo.aspect]}
        >
          <SelectSection showDivider title="横屏">
            {horizontalAspectOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectSection>
          <SelectSection showDivider title="竖屏">
            {verticalAspectOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectSection>
        </Select>
        <Divider />
        <div className="flex w-full py-2">
          <div className="w-4/5">
            <Input
              type="url"
              label={t("mask")}
              value={propertyInfo.color}
              placeholder={propertyInfo.color}
              onChange={(e) => updateProperty("color", e.target.value)}
            />
          </div>
          <div className="flex-grow" />
        </div>
        <Slider
          label={t("transparence")}
          value={Number(parseInt(propertyInfo.blurTrans, 16) / 2.55)}
          onChange={handleBlurTransChange}
          size="sm"
          step={5}
          className="max-w-md my-2"
        />
        <Divider />
        <div className="flex w-full py-2">
          <div className="w-4/5">
            <Select
              label={t("font")}
              onChange={handleFontChange}
              defaultSelectedKeys={["font-anke"]}
            >
              {fontOptions.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex-grow" />
          <div className="w-1/6 ml-2 mt-1">
            <input
              type="file"
              className="hidden"
              onChange={handleFontUpload}
              ref={fontInputRef}
            />
            <Button
              isIconOnly
              color="primary"
              variant="flat"
              size="lg"
              onClick={handleFontButtonClick}
            >
              <svg
                className="w-5 h-5 text-[#2F6EE7] dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.3"
                  d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"
                />
              </svg>
            </Button>
          </div>
        </div>

        <div className="flex w-full py-2">
          <div className="w-4/5">
            <Select
              label={t("icon")}
              items={deviconList}
              onSelectionChange={handleDeviconChange}
              defaultSelectedKeys={["aarch64-plain"]}
              renderValue={(items) => {
                return items.map((item) => (
                  <div key={item.key} className="flex gap-2 items-center">
                    <i
                      className={`devicon-${item.key} text-black dev-icon text-base`}
                    ></i>
                    <div className="flex flex-col">{item.data.name}</div>
                  </div>
                ));
              }}
            >
              {(item) => (
                <SelectItem
                  key={item.name + "-" + item.versions.font[0]}
                  textValue={item.name}
                >
                  <div className="flex gap-2 items-center">
                    <i
                      className={`devicon-${item.name}-${item.versions.font[0]} text-black dev-icon text-2xl`}
                    ></i>
                    <div className="flex flex-col">{item.name}</div>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>
          <div className="flex-grow" />
          <div className="w-1/6 ml-2 mt-1">
            <input
              type="file"
              className="hidden"
              onChange={handleIconUpload}
              ref={iconInputRef}
            />
            <Button
              isIconOnly
              color="primary"
              variant="flat"
              size="lg"
              onClick={handleIconButtonClick}
            >
              <svg
                className="w-5 h-5 text-[#2F6EE7] dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.3"
                  d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"
                />
              </svg>
            </Button>
          </div>
        </div>

        <Tabs
          classNames={{
            tabList: "w-full my-2",
            tab: "w-[47px] h-12",
          }}
          aria-label="Options"
          selectedKey={propertyInfo.logoPosition}
          onSelectionChange={(key) => updateProperty("logoPosition", key)}
        >
          <Tab
            key="top-4 left-4"
            title={
              <div className="flex items-center space-x-2">
                <TopLeftIcon />
              </div>
            }
          />
          <Tab
            key="bottom-4 left-4"
            title={
              <div className="flex items-center space-x-2">
                <BottomLeftIcon />
              </div>
            }
          />
          <Tab
            key="default"
            title={
              <div className="flex items-center space-x-2">
                <MiddleIcon />
              </div>
            }
          />

          <Tab
            key="bottom-4 right-4"
            title={
              <div className="flex items-center space-x-2">
                <BottomRightIcon />
              </div>
            }
          />
          <Tab
            key="top-4 right-4"
            title={
              <div className="flex items-center space-x-2">
                <TopRightIcon />
              </div>
            }
          />
        </Tabs>

        <Divider />
        <Textarea
          label={t("title")}
          placeholder={t("title_place")}
          className="max-w-xs py-2"
          value={propertyInfo.title}
          onValueChange={(value) => updateProperty("title", value)}
        />

        <Slider
          label={t("font_size")}
          value={Number(propertyInfo.fontSizeValue)}
          onChange={(value) => updateProperty("fontSizeValue", value)}
          size="sm"
          step={1}
          min={10}
          max={100}
          className="max-w-md my-2"
        />

        <Input
          label={t("author")}
          type="search"
          className="py-2"
          placeholder="输入作者"
          value={propertyInfo.author}
          onValueChange={(value) => updateProperty("author", value)}
        />

        <Slider
          label={t("author_size")}
          value={Number(propertyInfo.authorFontSizeValue)}
          onChange={(value) => updateProperty("authorFontSizeValue", value)}
          size="sm"
          step={1}
          min={10}
          max={100}
          className="max-w-md my-2"
        />
      </div>
      <Divider />
      <div className="w-full mt-4 px-4">
        <div className="text-gray-400 text-sm">{t("download")}</div>
        <div className="flex justify-between my-3">
          <Button
            onClick={() => handleImageDownload("jpg")}
            as={Link}
            color="primary"
            variant="flat"
          >
            JPG
          </Button>
          <Button
            onClick={() => handleImageDownload("png")}
            as={Link}
            color="primary"
            variant="flat"
          >
            PNG
          </Button>
          <Button
            onClick={() => handleImageDownload("svg")}
            as={Link}
            color="primary"
            variant="flat"
          >
            SVG
          </Button>
        </div>
      </div>
    </div>
  );
};
