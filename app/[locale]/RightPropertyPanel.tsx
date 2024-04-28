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
import {useTranslations} from 'next-intl';
export const RightPropertyPanel = (props) => {
  const titleArr = config.title;

  const [titleValue, setTitleValue] = React.useState(
    titleArr[Math.floor(Math.random() * 4)]
  );
  const [subTitleValue, setSubTitleValue] = React.useState(config.subTitle);
  const [authorValue, setAuthorValue] = React.useState(config.author);
  const [fontValue, setFontValue] = React.useState(config.font);
  const [iconValue, setIconValue] = React.useState(config.icon);
  const [backColor, setBackColor] = React.useState(config.backColor);
  const [backBlurLevel, setBackBlurLevel] = React.useState(config.backBlurLevel);
  const [deviconValue, setDevIconValue] = React.useState<Selection>(
    new Set(config.deviconValue)
  );
  const [aspectValue, setAspectValue] = React.useState(config.aspect);
  const [blurValue, setBlurValue] = React.useState<SliderValue>(config.blur);
  const [blurTransValue, setBlurTransValue] = React.useState<SliderValue>(config.blurTrans);
  const inputRef = React.useRef(null);
  const [logoPosition, setLogoPosition] = React.useState(config.logoPosition);
  const t = useTranslations('RightPropertyPanel');
  const handleFileChange = (event) => {
    if (event.target.files[0] != null) {
      const file = URL.createObjectURL(event.target.files[0]);
      setIconValue(file);
      setDevIconValue(new Set([""]));
    }
  };

  const handleAspectSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAspectValue(e.target.value);
  };

  const onFontSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontValue(e.target.value);
  };

  const getColorPlaceHolder = () => {
    backColor.replace("#", "");
  };

  const [propertyInfo, setPropertyInfo] = React.useState({
    font: "",
    title: "",
    subTitle: "",
    author: "",
    icon: "",
    devicon: "",
    color: "",
    aspect: "",
    blur: "",
    blurTrans: "",
    logoPosition: "",
  });

  React.useEffect(() => {
    setPropertyInfo((preValue) => ({
      ...preValue,
      author: authorValue,
    }));
  }, [authorValue]);

  React.useEffect(() => {
    setPropertyInfo((preValue) => ({
      ...preValue,
      title: titleValue,
    }));
  }, [titleValue]);

  React.useEffect(() => {
    setPropertyInfo((preValue) => ({
      ...preValue,
      icon: iconValue,
    }));
  }, [iconValue]);

  React.useEffect(() => {
    setPropertyInfo((preValue) => ({
      ...preValue,
      font: fontValue,
    }));
  }, [fontValue]);

  React.useEffect(() => {
    setPropertyInfo((preValue) => ({
      ...preValue,
      logoPosition: logoPosition,
    }));
  }, [logoPosition]);

  React.useEffect(() => {
    var icon = "";
    if (deviconValue.size > 0) {
      icon = Array.from(deviconValue)[0].toString();
    }

    setPropertyInfo((preValue) => ({
      ...preValue,
      devicon: icon,
    }));
  }, [deviconValue]);

  React.useEffect(() => {
    setPropertyInfo((preValue) => ({
      ...preValue,
      color: backColor,
    }));
  }, [backColor]);

  React.useEffect(() => {
    let trans = Math.floor(
      2.55 * parseInt(blurTransValue.toString(10))
    ).toString(16);

    setPropertyInfo((preValue) => ({
      ...preValue,
      blurTrans: trans,
    }));
  }, [blurTransValue]);

  React.useEffect(() => {
    var blurLevel: string = "backdrop-blur-none";
    if (typeof blurValue === "number") {
      if (blurValue == 0) {
        blurLevel = "backdrop-blur-none";
      } else if (blurValue == 20) {
        blurLevel = "backdrop-blur-sm";
      } else if (blurValue == 40) {
        blurLevel = "backdrop-blur";
      } else if (blurValue == 60) {
        blurLevel = "backdrop-blur-md";
      } else if (blurValue == 80) {
        blurLevel = "backdrop-blur-lg";
      } else if (blurValue == 100) {
        blurLevel = "backdrop-blur-xl";
      }
    }
    setPropertyInfo((preValue) => ({
      ...preValue,
      blur: blurLevel,
    }));
  }, [blurValue]);

  React.useEffect(() => {
    setPropertyInfo((preValue) => ({
      ...preValue,
      aspect: aspectValue,
    }));
  }, [aspectValue]);

  React.useEffect(() => {
    props.onPropInfoChange(propertyInfo);
  }, [propertyInfo]);

  const dowloadImage = (imgFormat: string) => {
    props.onImageDowloadClick(imgFormat);
  };

  const img_aspect_x_list = [
    // 横屏
    { label: "1 : 1", value: "aspect-square", description: "900x450" },
    { label: "2 : 1", value: "aspect-[2/1]", description: "900x450" },
    { label: "3 : 2", value: "aspect-[3/2]", description: "900x450" },
    { label: "4 : 3", value: "aspect-[4/3]", description: "900x450" },
    { label: "16: 9", value: "aspect-[16/9]", description: "900x450" },
  ];

  const img_aspect_y_list = [
    //  竖屏
    { label: "1:2", value: "aspect-[1/2]", description: "900x450" },
    { label: "2:3", value: "aspect-[2/3]", description: "900x450" },
    { label: "3:4", value: "aspect-[3/4]", description: "900x450" },
    { label: "9:16", value: "aspect-[9/16]", description: "900x450" },
  ];

  const font_list = [
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

  const backStyle = {
    fontSize: "20px",
    backgroundColor: backColor,
    borderWidth: "6px",
    borderColor: "#E9E9EB",
  };

  const handleColorChangeComplete = (color) => {
    setBackColor(color.hex.toUpperCase());
  };

  const handleColorBlurChangeComplete = (level) => {
    setBackBlurLevel(level);
  };

  return (
    <div className="w-full flex flex-col h-screen">
      <div className="w-full">
        <Navbar
          classNames={{
            wrapper: "px-4",
          }}
        >
          <NavbarBrand>
            <p className="text-gray-350 font-bold text-inherit">{t("property")}</p>
          </NavbarBrand>

          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                variant="flat"
                target="_blank"
                href="https://github.com/gezhaoyou/picprose"
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
          label={t('aspect')}
          className="max-w-xs py-2"
          defaultSelectedKeys={["aspect-[16/9]"]}
          onChange={handleAspectSelectionChange}
        >
          <SelectSection showDivider title="横屏">
            {img_aspect_x_list.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectSection>
          <SelectSection showDivider title="竖屏">
            {img_aspect_y_list.map((item) => (
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
              label={t('mask')}
              value={backColor}
              placeholder={backColor}
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
                  style={backStyle}
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
                      onChangeComplete={handleColorChangeComplete}
                    />
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <Slider
          label={t('transparence')}
          value={blurTransValue}
          onChange={setBlurTransValue}
          size="sm"
          step={5}
          className="max-w-md my-2"
        />
        {/* <Slider
          label="模糊"
          value={blurValue}
          onChange={setBlurValue}
          size="sm"
          step={20}
          className="max-w-md py-2"
        /> */}

        <Divider />
        <Select
          label={t("font")}
          className="max-w-xs py-2"
          onChange={onFontSelectChange}
          defaultSelectedKeys={["font-anke"]}
        >
          {font_list.map((font) => (
            <SelectItem key={font.value} value={font.value}>
              {font.label}
            </SelectItem>
          ))}
        </Select>

        <div className="flex w-full py-2">
          <div className="w-4/5">
            <Select
              label={t('icon')}
              items={deviconList}
              onSelectionChange={setDevIconValue}
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
              onChange={handleFileChange}
              ref={inputRef}
            />
            <Button
              isIconOnly
              color="primary"
              variant="flat"
              size="lg"
              onClick={() => inputRef.current.click()}
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
          selectedKey={logoPosition}
          onSelectionChange={setLogoPosition}
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
          value={titleValue}
          onValueChange={setTitleValue}
        />

        <Input
          label={t("author")}
          type="search"
          className="py-2"
          placeholder="输入作者"
          value={authorValue}
          onValueChange={setAuthorValue}
        />
      </div>
      <Divider />
      <div className="w-full mt-4 px-4">
        <div className="text-gray-400 text-sm">{t("download")}</div>
        <div className="flex justify-between my-3">
          <Button
            onClick={() => dowloadImage("jpg")}
            as={Link}
            color="primary"
            variant="flat"
          >
            JPG
          </Button>
          <Button
            onClick={() => dowloadImage("png")}
            as={Link}
            color="primary"
            variant="flat"
          >
            PNG
          </Button>
          <Button
            onClick={() => dowloadImage("svg")}
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
