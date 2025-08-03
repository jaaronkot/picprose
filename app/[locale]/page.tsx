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
import { ImageEditorToolbar } from "./ImageEditorToolbar";
import { PicproseProvider } from "./PicproseContext";
import { ComponentToImg } from "./ComponentToImg";

// Define editor state types
type EditorElements = {
  title: { x: number; y: number; visible: boolean };
  author: { x: number; y: number; visible: boolean };
  icon: { x: number; y: number; visible: boolean };
  image: { x: number; y: number };
};

export default function Home() {
  const [selectedImage, setSelectedImage] = React.useState({});
  
  // Lift all state to the top-level component
  const [isDragMode, setIsDragMode] = React.useState(false);
  const [elements, setElements] = React.useState<EditorElements>({
    title: { x: 0, y: 0, visible: true },
    author: { x: 0, y: 0, visible: true },
    icon: { x: 0, y: 0, visible: true },
    image: { x: 0, y: 0 }
  });
  
  // Initialize history with initial state
  const initialElements = {
    title: { x: 0, y: 0, visible: true },
    author: { x: 0, y: 0, visible: true },
    icon: { x: 0, y: 0, visible: true },
    image: { x: 0, y: 0 }
  };
  const [history, setHistory] = React.useState<EditorElements[]>([initialElements]);
  const [historyIndex, setHistoryIndex] = React.useState(0);

  // Add reference to ComponentToImg
  const componentToImgRef = React.useRef<{ downloadImage: (format: string) => void } | null>(null);
  
  // Modify image download method
  const handleDownload = (format: string) => {
    // Call ComponentToImg download method
    if (componentToImgRef.current) {
      componentToImgRef.current.downloadImage(format);
    }
  };

  // Reset all editor state
  const handleResetLayout = () => {
    const resetElements = {
      title: { x: 0, y: 0, visible: true },
      author: { x: 0, y: 0, visible: true },
      icon: { x: 0, y: 0, visible: true },
      image: { x: 0, y: 0 }
    };
    setElements(resetElements);
    setHistory([resetElements]);
    setHistoryIndex(0);
    setIsDragMode(false);
  };

  // Save history
  const saveHistory = (currentElements: EditorElements) => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), {...currentElements}]);
    setHistoryIndex(prev => prev + 1);
  };

  return (
    <PicproseProvider onDownload={handleDownload}>
      <div className="flex flex-col lg:flex-row h-screen max-h-screen">
        {/* Left panel - fixed width 350px */}
        <div className="lg:w-[350px] flex-shrink-0 h-screen overflow-hidden">
          <LeftResourcePanel />
        </div>
        
        {/* Middle content area - adaptive fill remaining space */}
        <div className="flex-grow flex flex-col bg-white dark:bg-gray-900 h-screen max-h-screen overflow-hidden relative">
          <div className="flex-1 flex justify-center items-center bg-gray-100 dark:bg-gray-800">
            <ComponentToImg ref={componentToImgRef}>
              <ImageEditor 
                isDragMode={isDragMode}
                elements={elements}
                setElements={setElements}
                saveHistory={saveHistory}
                handleResetLayout={handleResetLayout}
              />
            </ComponentToImg>
          </div>
          
          {/* Toolbar floating above */}
          <ImageEditorToolbar 
            isDragMode={isDragMode}
            setIsDragMode={setIsDragMode}
            handleResetLayout={handleResetLayout}
            history={history}
            historyIndex={historyIndex}
            setElements={setElements}
            setHistoryIndex={setHistoryIndex}
          />
        </div>
        
        {/* Right panel - fixed width 350px */}
        <div className="lg:w-[350px] flex-shrink-0 h-screen overflow-hidden">
          <RightPropertyPanel />
        </div>
      </div>
    </PicproseProvider>
  );
}
