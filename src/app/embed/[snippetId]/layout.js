import "@/css/globals.css"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Embed - CodySnippets',
  description: 'Embed CodySnippets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
    
        {children}
  
    </body>
  </html>
    
  )
}
