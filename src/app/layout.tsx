import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import Aside from '@/components/Aside'

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
          {children}
        </div>
      </body>
    </html>
  )
}
