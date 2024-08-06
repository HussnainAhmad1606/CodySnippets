import "../css/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import {Toaster} from "react-hot-toast"
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react"
export const metadata = {
  title: "Welcome to CodySnippets",
  description: "A collection of code snippets for web developers.",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="custom" lang="en">
      <body className={inter.className}>
        <Analytics/>
        <Toaster className="z-10" />
        <Navbar />

        {children}

        <Footer/>
      </body>
    </html>
  );
}
