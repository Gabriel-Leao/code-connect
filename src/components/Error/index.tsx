import Image from 'next/image'
import Link from 'next/link'

interface ErrorComponentProps {
  image: string
  title: string
  description: string
}

const ErrorComponent = ({ image, title, description }: ErrorComponentProps) => {
  return (
    <div className="flex flex-col items-center gap-14">
      <div>
        <Image
          src={image}
          alt="imagem de erro"
          width={656}
          height={367}
        />
      </div>
      <div className="text-center">
        <h1 className="text-4xl text-[#81FE88]">{title}</h1>
        <p className="text-[#BCBCBC] text-2xl pb-10 pt-4">{description}</p>
        <Link
          href="/"
          className="flex items-center gap-x-2 justify-center">
          <span className="underline text-lg text-[#BFFFC3]">
            Voltar ao feed
          </span>
          <Image
            src="/left-arrow.svg"
            alt="seta verde apontada para o lado esquerdo"
            width={18}
            height={24}
          />
        </Link>
      </div>
    </div>
  )
}

export default ErrorComponent
