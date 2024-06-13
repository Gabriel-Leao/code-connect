import Image from 'next/image'
import Link from 'next/link'

const Aside = () => {
  return (
    <aside className="rounded-lg bg-[#171D1F] py-10 px-4 min-h-screen max-w-[177px]">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo da code connect"
          width={ 127 }
          height={ 40 }
          style={ { width: '127px', height: '40px' } }
          priority={ true }
        />
      </Link>
    </aside>
  )
}

export default Aside
