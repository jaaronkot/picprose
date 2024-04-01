import type { Metadata } from "next";
import "./globals.css";
import {Providers} from "./providers";
import { GoogleAnalytics } from '@next/third-parties/google'

import { Open_Sans, Roboto_Mono, Anek_Latin } from 'next/font/google'
import localFont from 'next/font/local'
 
// Font files can be colocated inside of `app`
const dingTalkFont = localFont({
  src: 'font/DingTalk JinBuTi.ttf',
  display: 'swap',
  variable: '--font-dingtalk',
})
 
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  //👇 Add variable to our object
  variable: '--font-opensans',
})
 
//👇 Configure the object for our second font
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

//👇 Configure the object for our second font
const ankeLatin = Anek_Latin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anke',
})
 
export const metadata: Metadata = {
  title: "PicProse - Better Cover Image Generator Tools",
  description: "PicProse is better cover image generator tool for Medium, YouTube, BiliBili, Blog and more.",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${robotoMono.variable} ${ankeLatin.variable} ${dingTalkFont.variable} font-sans light`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-XWHW3HHDZR" />
    </html>
  );
}