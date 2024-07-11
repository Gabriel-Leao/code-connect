import { IconButtonProps } from '@/components/IconButton'
import { Suspense } from 'react'
import Spinner from '@/components/Spinner'
import { useFormStatus } from 'react-dom'
import Image from 'next/image'

const ModalButton = (props: IconButtonProps) => {
  const { pending } = useFormStatus()
  return (
    <button
      {...props}
      disabled={pending}
      className="border-none cursor-pointer bg-[#81FE88] text-[#132E35] text-lg rounded-lg py-3 px-4 flex items-center gap-x-2 ml-auto">
      {pending ? (
        <Suspense>
          <Spinner />
        </Suspense>
      ) : (
        <>
          {props.children}
          <Image
            src="/right-arrow.svg"
            alt="seta para a direita"
            width={14}
            height={13}
          />
        </>
      )}
    </button>
  )
}

export default ModalButton
