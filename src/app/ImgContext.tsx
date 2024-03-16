import React, { createContext, useState } from "react";

interface ImgContextProps {
  unsplashImage: string | undefined;
  setUnsplashImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ImgContext = createContext<ImgContextProps>({
  unsplashImage: undefined,
  setUnsplashImage: () => { },
});

const ImgProvider: React.FC = ({ children }) => {
  const [unsplashImage, setUnsplashImage] = useState<string>();

  return (
    <ImgContext.Provider value={{ unsplashImage, setUnsplashImage }}>
      {children}
    </ImgContext.Provider>
  );
};

export { ImgProvider, ImgContext };