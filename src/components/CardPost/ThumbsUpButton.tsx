'use client'

import { useFormStatus } from 'react-dom'

import Image from 'next/image'
import IconButton from '@/components/IconButton'
import Spinner from '@/components/Spinner'

const ThumbsUpButton = () => {
  const { pending } = useFormStatus()
  return (
    <IconButton disabled={pending}>
      {pending ? (
        <Spinner />
      ) : (
        <Image
          src="/thumbs.svg"
          alt="icone de dedão"
          width={26}
          height={26}
        />
      )}
    </IconButton>
  )
}

export default ThumbsUpButton
