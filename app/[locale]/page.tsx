"use client";
import React from "react";
import {
  Listbox,
  ListboxItem,
  Chip,
  ScrollShadow,
  Avatar,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { LeftResourcePanel } from "./LeftResourcePanel";
import { RightPropertyPanel } from "./RightPropertyPanel";
import { users } from "./data";
import { ImageEditor } from "./ImageEditor";
import { ComponentToImg } from "./ComponentToImg";
import { PicproseProvider } from "./PicproseContext";

export default function Home() {
  const child1Ref = React.useRef<ComponentToImg>(null);
  const [selectedImage, setSelectedImage] = React.useState({});

  const [editorProperties, setEditorProperties] = React.useState({
    font: "",
    title: "",
    subTitle: "",
    author: "",
    icon: "",
    color: "",
    devicon: "",
    aspect: "",
    blur: "",
    blurTrans: "",
    logoPosition: "",
  });

  const handleImageSelect = (data: any) => {
    setSelectedImage(data);
  };

  const handleImageDownload = (format: string) => {
    if (child1Ref.current) {
      child1Ref.current.downloadImage(format);
    }
  };

  const handlePropertiesChange = (properties: any) => {
    setEditorProperties(properties);
  };

  // 处理下载图片的方法
  const handleDownload = (format: string) => {
    console.log(`Downloading image as ${format}`);
    // ... 实现下载逻辑 ...
  };

  return (
    <PicproseProvider onDownload={handleDownload}>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-12 h-screen max-h-screen">
        <div className="lg:col-span-3 h-screen overflow-hidden">
          <LeftResourcePanel />
        </div>
        <div className="lg:col-span-6 flex justify-center items-center bg-white dark:bg-gray-900 h-screen max-h-screen overflow-hidden">
          <ImageEditor />
        </div>
        <div className="lg:col-span-3 h-screen overflow-hidden">
          <RightPropertyPanel />
        </div>
      </div>
    </PicproseProvider>
  );
}
