import "../../css/globals.css"
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create an Account - CodySnippets',
  description: 'Signup to CodySnippets',
}

export default function RootLayout({ children }) {
  return (
    <>
        {children}
    </>
  )
}
