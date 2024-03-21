import type { Metadata } from "next";
import "./globals.css";
import {Providers} from "./providers";
import Head from 'next/head'
 
import { Inter, Roboto_Mono } from 'next/font/google'
 
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})
 
export const metadata: Metadata = {
  title: "PicProse - Better Cover Image Generator Tools",
  description: "PicProse is better cover image generator tool for Medium, YouTube, BiliBili, Blog and more.",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className='light ${roboto_mono.variable} ${inter.variable}'>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}