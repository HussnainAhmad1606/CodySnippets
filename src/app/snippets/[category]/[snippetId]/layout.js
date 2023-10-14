import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Snippets - CodySnippets',
  description: 'Code Snippets on CodySnippets',
}

export default function RootLayout({ children }) {
  return (
    <>
        {children}
    </>
  )
}
