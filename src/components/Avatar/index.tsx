import Image from 'next/image'

const Avatar = ({ userName, imgSrc }: { userName: string; imgSrc: string }) => {
  return (
    <ul className="flex items-center gap-x-2 justify-end">
      <li>
        <Image
          src={imgSrc}
          alt={`Avatar do usuário: ${userName}`}
          width={32}
          height={32}
        />
      </li>
      <li className="text-[#888888]">@{userName}</li>
    </ul>
  )
}

export default Avatar
