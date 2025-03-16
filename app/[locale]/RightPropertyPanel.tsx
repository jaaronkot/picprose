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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Switch,
  CheckboxIcon,
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

const CheckIcon = () => (
  <svg 
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M9.55 18l-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4 9.55 18z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

export const RightPropertyPanel = () => {
  const t = useTranslations("RightPropertyPanel");
  const { propertyInfo, updateProperty, downloadImage } = usePicprose();
  
  const titleOptions = config.title;
  const iconInputRef = React.useRef<HTMLInputElement>(null);
  const fontInputRef = React.useRef<HTMLInputElement>(null);
  const [showDimensionsModal, setShowDimensionsModal] = React.useState(false);

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
    updateProperty("blur", level);
  };

  const handleDeviconChange = (selection: Selection) => {
    let icon = "";
    if (selection && typeof selection !== "string" && selection.size > 0) {
      icon = Array.from(selection)[0].toString();
    }
    updateProperty("devicon", icon);
  };

  const handleBlurTransChange = (value: SliderValue) => {
    updateProperty("blurTrans", typeof value === "number" ? value.toString() : value[0].toString());
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
    { label: "1 : 1", value: "aspect-square", description: "1185 × 1185" },
    { label: "2 : 1", value: "aspect-[2/1]", description: "1185 × 593" },
    { label: "3 : 2", value: "aspect-[3/2]", description: "1185 × 790" },
    { label: "4 : 3", value: "aspect-[4/3]", description: "1185 × 889" },
    { label: "16: 9", value: "aspect-[16/9]", description: "1185 × 667" },
  ];

  const verticalAspectOptions = [
    { label: "1:2", value: "aspect-[1/2]", description: "593 × 1185" },
    { label: "2:3", value: "aspect-[2/3]", description: "790 × 1185" },
    { label: "3:4", value: "aspect-[3/4]", description: "889 × 1185" },
    { label: "9:16", value: "aspect-[9/16]", description: "667 × 1185" },
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

  const handleCustomWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(e.target.value) || 1920;
    updateProperty("customWidth", width);
    if (propertyInfo.isCustomAspect) {
      const height = propertyInfo.customHeight || 1080;
      updateProperty("aspect", `aspect-[${width}/${height}]`);
    }
  };

  const handleCustomHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(e.target.value) || 1080;
    updateProperty("customHeight", height);
    if (propertyInfo.isCustomAspect) {
      const width = propertyInfo.customWidth || 1920;
      updateProperty("aspect", `aspect-[${width}/${height}]`);
    }
  };

  const toggleCustomAspect = () => {
    const newIsCustom = !propertyInfo.isCustomAspect;
    updateProperty("isCustomAspect", newIsCustom);
    
    if (newIsCustom) {
      const width = propertyInfo.customWidth || 1920;
      const height = propertyInfo.customHeight || 1080;
      updateProperty("aspect", `aspect-[${width}/${height}]`);
    }
  };

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const formatAspectRatio = (width: number, height: number): string => {
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  };

  const getCurrentDimensionsText = () => {
    if (propertyInfo.isCustomAspect) {
      return {
        ratio: formatAspectRatio(propertyInfo.customWidth || 1920, propertyInfo.customHeight || 1080),
        dimensions: `${propertyInfo.customWidth || 1920} × ${propertyInfo.customHeight || 1080}`
      };
    }
    
    const allOptions = [...horizontalAspectOptions, ...verticalAspectOptions];
    const selectedOption = allOptions.find(option => option.value === propertyInfo.aspect);
    
    if (selectedOption) {
      return {
        ratio: selectedOption.label,
        dimensions: selectedOption.description
      };
    }
    
    return {
      ratio: "16:9",
      dimensions: "1920 × 1080"
    };
  };

  return (
    <div className="w-full flex flex-col h-screen max-w-md mx-auto relative overflow-hidden">
      {/* 原始面板内容 */}
      <div 
        className={`absolute inset-0 flex flex-col w-full h-full transition-transform duration-300 ${
          showDimensionsModal ? 'translate-x-[-100%]' : 'translate-x-0'
        }`}
      >
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
        
        <div className="flex-grow overflow-y-auto overflow-x-hidden flex flex-col px-4">
          <div className="w-full py-2">
            <p className="text-sm text-gray-500 mb-1">{t("aspect")}</p>
            <div 
              className="rounded-lg bg-default-100 dark:bg-default-50 p-4 flex justify-between items-center cursor-pointer border border-default-200"
              onClick={() => setShowDimensionsModal(true)}
            >
              <div>
                <div className="text-lg font-bold">
                  {getCurrentDimensionsText().ratio}
                </div>
                <div className="text-sm text-gray-400">
                  {getCurrentDimensionsText().dimensions}
                </div>
              </div>
              <span className="text-xl text-gray-400">›</span>
            </div>
          </div>
          
          <Divider className="my-2" />
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
            <div className="w-1/6 ml-2 mt-1">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    color="primary"
                    variant="bordered"
                    size="lg"
                    style={colorBackgroundStyle}
                  ></Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                >
                  <DropdownItem key="text">
                    <div className="m-2">
                      <CirclePicker
                        colors={[
                          "#1f2937",
                          "#e91e63",
                          "#9c27b0",
                          "#673ab7",
                          "#3f51b5",
                          "#2196f3",
                          "#03a9f4",
                          "#00bcd4",
                          "#009688",
                          "#4caf50",
                          "#8bc34a",
                          "#cddc39",
                        ]}
                        onChangeComplete={handleColorChange}
                      />
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <Slider
            label={t("transparence")}
            value={Number(parseInt(propertyInfo.blurTrans, 16) / 2.55)}
            onChange={handleBlurTransChange}
            size="sm"
            step={5}
            className="w-full my-2"
          />
          <Divider />
          <div className="flex w-full py-2 items-end gap-2">
            <div className="flex-grow">
              <Select
                label={t("font")}
                className="w-full"
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
            <div>
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
          <div className="flex w-full py-2 items-end gap-2">
            <div className="flex-grow">
              <Select
                label={t("icon")}
                className="w-full"
                items={deviconList}
                onSelectionChange={handleDeviconChange}
                defaultSelectedKeys={["aarch64-plain"]}
                renderValue={(items) => {
                  return items.map((item) => (
                    <div key={item.key} className="flex gap-2 items-center">
                      <i
                        className={`devicon-${item.key} text-black dev-icon text-base`}
                      ></i>
                      <div className="flex flex-col">{item.data?.name}</div>
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
            <div>
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
            onSelectionChange={(key) => updateProperty("logoPosition", key.toString())}
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
            className="w-full py-2"
            value={propertyInfo.title}
            onValueChange={(value) => updateProperty("title", value)}
          />

          <Slider
            label={t("font_size")}
            value={Number(propertyInfo.fontSizeValue)}
            onChange={(value) => updateProperty("fontSizeValue", typeof value === "number" ? value.toString() : value[0].toString())}
            size="sm"
            step={1}
            minValue={10}
            maxValue={100}
            className="w-full my-2"
          />

          <Input
            label={t("author")}
            type="search"
            className="w-full py-2"
            placeholder="输入作者"
            value={propertyInfo.author}
            onValueChange={(value) => updateProperty("author", value)}
          />

          <Slider
            label={t("author_size")}
            value={Number(propertyInfo.authorFontSizeValue)}
            onChange={(value) => updateProperty("authorFontSizeValue", typeof value === "number" ? value.toString() : value[0].toString())}
            size="sm"
            step={1}
            minValue={10}
            maxValue={100}
            className="w-full my-2"
          />
        </div>
        
        <Divider />
        <div className="w-full mt-4 px-4 pb-4">
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

      {/* 比例选择面板 */}
      <div 
        className={`absolute inset-0 flex flex-col w-full h-full bg-background dark:bg-background transition-transform duration-300 ${
          showDimensionsModal ? 'translate-x-0' : 'translate-x-[100%]'
        }`}
      >
        <div className="w-full">
          <Navbar classNames={{ wrapper: "px-4" }}>
            <NavbarBrand>
              <Button 
                isIconOnly
                variant="light" 
                onPress={() => setShowDimensionsModal(false)}
                className="mr-2"
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z" 
                    fill="currentColor"
                  />
                </svg>
              </Button>
              <p className="text-gray-350 font-bold text-inherit">
                {t("select_dimensions") || "选择尺寸"}
              </p>
            </NavbarBrand>
            
            <NavbarContent justify="end">
              <NavbarItem>
                <Button
                  color="primary"
                  variant="flat"
                  onPress={() => setShowDimensionsModal(false)}
                >
                  {t("confirm") || "确认"}
                </Button>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
        </div>
        
        <div className="flex-grow overflow-y-auto overflow-x-hidden flex flex-col px-4">
          <div className="grid grid-cols-1 gap-2 py-2">
            <p className="text-sm font-medium text-gray-500">{t("custom_resolution") || "自定义分辨率"}</p>
            <div className="p-3 rounded-md bg-gray-100 dark:bg-gray-800">
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  min="1"
                  label={t("width") || "宽"}
                  size="sm"
                  value={String(propertyInfo.customWidth || 1185)}
                  onChange={(e) => {
                    const width = parseInt(e.target.value) || 1185;
                    updateProperty("customWidth", width);
                    updateProperty("isCustomAspect", true);
                    updateProperty("aspect", `aspect-[${width}/${propertyInfo.customHeight || 1185}]`);
                  }}
                  className="flex-1"
                />
                <span className="mx-2">×</span>
                <Input
                  type="number"
                  min="1"
                  label={t("height") || "高"}
                  size="sm"
                  value={String(propertyInfo.customHeight || 1185)}
                  onChange={(e) => {
                    const height = parseInt(e.target.value) || 1185;
                    updateProperty("customHeight", height);
                    updateProperty("isCustomAspect", true);
                    updateProperty("aspect", `aspect-[${propertyInfo.customWidth || 1185}/${height}]`);
                  }}
                  className="flex-1"
                />
              </div>
            </div>

            <Divider className="my-2" />
            
            <p className="text-sm font-medium text-gray-500">{t("landscape") || "横屏"}</p>
            {horizontalAspectOptions.map((option) => (
              <div 
                key={option.value}
                onClick={() => {
                  updateProperty("aspect", option.value);
                  updateProperty("isCustomAspect", false);
                  
                  const dimensions = option.description.split(" × ");
                  const width = parseInt(dimensions[0]);
                  const height = parseInt(dimensions[1]);
                  
                  updateProperty("customWidth", width);
                  updateProperty("customHeight", height);
                }}
                className={`p-3 rounded-md flex justify-between items-center cursor-pointer ${
                  propertyInfo.aspect === option.value && !propertyInfo.isCustomAspect 
                    ? "bg-primary-100 border border-primary-500" 
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
                {propertyInfo.aspect === option.value && !propertyInfo.isCustomAspect && (
                  <CheckboxIcon className="w-5 h-5 text-primary-500" />
                )}
              </div>
            ))}
            
            <p className="text-sm font-medium text-gray-500 mt-2">{t("portrait") || "竖屏"}</p>
            {verticalAspectOptions.map((option) => (
              <div 
                key={option.value}
                onClick={() => {
                  updateProperty("aspect", option.value);
                  updateProperty("isCustomAspect", false);
                  
                  const dimensions = option.description.split(" × ");
                  const width = parseInt(dimensions[0]);
                  const height = parseInt(dimensions[1]);
                  
                  updateProperty("customWidth", width);
                  updateProperty("customHeight", height);
                }}
                className={`p-3 rounded-md flex justify-between items-center cursor-pointer ${
                  propertyInfo.aspect === option.value && !propertyInfo.isCustomAspect 
                    ? "bg-primary-100 border border-primary-500" 
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
                {propertyInfo.aspect === option.value && !propertyInfo.isCustomAspect && (
                  <CheckboxIcon className="w-5 h-5 text-primary-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
