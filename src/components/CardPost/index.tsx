import Image from 'next/image'
import Avatar from '@/components/Avatar'
import Link from 'next/link'

export interface Post {
  id: string
  cover: string
  title: string
  body: string
  slug: string
  markdown: string
  author: {
    username: string
    avatar: string
    id: string
  }
}

interface CardPostProps {
  post: Post
  detailsCard?: boolean
}

const CardPost = ({ post, detailsCard = false }: CardPostProps) => {
  return (
    <article
      className={ `bg-[#171D1F] rounded-2xl ${ detailsCard ? 'max-w-[993px]' : 'max-w-[486px]' }` }>
      <header className="bg-[#888888] rounded-t-2xl">
        <figure className={ detailsCard ? 'p-4' : 'p-6' }>
          <Image
            src={ post.cover }
            alt={ `Capa do post: ${ post.title }` }
            width={ 438 }
            height={ 133 }
            className={ `rounded-2xl mx-auto ${ detailsCard ? 'w-[961px] h-[300px]' : 'w-[438px] h-[133px]' }` }
            priority={ false }
          />
        </figure>
      </header>
      <main className="p-4 pb-8 flex flex-col gap-y-2">
        <h2 className="text-[#BCBCBC] text-lg">{ post.title }</h2>
        <p className="text-[15px] text-[#BCBCBC] text-justify leading-[23px]">
          { post.body }
        </p>
        { !detailsCard && (
          <Link
            href={ `/posts/${ post.slug }` }
            className="text-[#81FE88] underline underline-offset-2">
            Ver detalhes
          </Link>
        ) }
      </main>

      <footer className="p-4 pt-0">
        <Avatar
          userName={ post.author.username }
          imgSrc={ post.author.avatar }
        />
      </footer>
    </article>
  )
}

export default CardPost
