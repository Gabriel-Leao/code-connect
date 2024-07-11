'use client'

import { useFormStatus } from 'react-dom'

import Image from 'next/image'
import IconButton from '@/components/IconButton'
import Spinner from '@/components/Spinner'
import { Suspense } from 'react'

const ThumbsUpButton = () => {
  const { pending } = useFormStatus()
  return (
    <IconButton disabled={pending}>
      {pending ? (
        <Suspense>
          <Spinner />
        </Suspense>
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
