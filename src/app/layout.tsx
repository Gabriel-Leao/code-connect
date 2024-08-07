import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'
import './globals.css'
import { ReactNode, Suspense } from 'react'
import Aside from '@/components/Aside'
import SearchInput from '../components/SearchForm'

const prompt = Prompt({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600']
})

export const metadata: Metadata = {
  title: 'Code connect',
  description: 'Uma rede social para desenvolvedores',
  authors: [{ name: 'Gabriel Leão', url: 'https://github.com/Gabriel-Leao' }]
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={prompt.className}>
        <div className="container xl:justify-center mx-auto gap-x-7 flex min-h-screen max-h-fit my-14">
          <Aside />
          <div className="xl:w-[995px]">
            <Suspense>
              <SearchInput />
            </Suspense>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
