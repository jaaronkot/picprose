import type { Metadata } from "next";
import "./globals.css";
import {Providers} from "./providers";
import Head from 'next/head'
 
import { Open_Sans, Roboto_Mono, Anek_Latin } from 'next/font/google'

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
    <html lang="en" className={`${openSans.variable} ${robotoMono.variable} ${ankeLatin.variable} font-sans light`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}