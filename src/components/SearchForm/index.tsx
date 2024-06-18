'use client'

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

const SearchInput = () => {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('q') || ''
  return (
    <form
      className="relative"
      action="/">
      <Image
        src="/search-icon.svg"
        alt="Icone de lupa"
        width={32}
        height={32}
        className="absolute left-4 top-2"
      />
      <input
        type="text"
        name="q"
        defaultValue={searchTerm}
        placeholder="Digite o que você procura"
        className="pl-16 text-[#BCBCBC] caret-[#BCBCBC] bg-[#171D1F] outline-none border-[#81FE88] focus:border-[1px] w-full h-12 mb-14 rounded-[4px]"
      />
    </form>
  )
}

export default SearchInput
