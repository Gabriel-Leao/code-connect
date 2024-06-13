import CardPost, { Post } from '@/components/CardPost'
import logger from '@/logger'
import Link from 'next/link'
import prisma from '../../prisma/prisma'

const getPosts = async (page: number) => {
  try {
    const take = 6
    const skip = (page - 1) * take
    const prev = page > 1 ? page - 1 : false
    const totalPage = Math.ceil((await prisma.post.count()) / take)
    const next = page < totalPage ? page + 1 : null
    const posts = await prisma.post.findMany({
      take,
      skip,
      include: { author: true },
      orderBy: { created_at: 'desc' }
    })
    logger.info('Posts encontrados com sucesso')
    return { posts, next, prev }
  } catch (error) {
    logger.error(error)
    return { posts: [], next: null, prev: null }
  }
}

const Home = async ({ searchParams }: { searchParams: { page: string } }) => {
  const currentPage = parseInt(searchParams?.page) || 1
  const { posts, prev, next } = await getPosts(currentPage)
  return (
    <main>
      {posts.length ? (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-14">
            {posts.map((post: Post) => (
              <CardPost
                post={post}
                key={post.id}
              />
            ))}
          </div>
          <div className="flex justify-center gap-6">
            {prev && (
              <Link
                href={`/?page=${prev}`}
                className="text-[#81FE88] underline underline-offset-2">
                Página anterior
              </Link>
            )}
            {next && (
              <Link
                href={`/?page=${next}`}
                className="text-[#81FE88] underline underline-offset-2">
                Próxima página
              </Link>
            )}
          </div>
        </>
      ) : (
        <p className="text-xl text-white text-center">Carregando posts...</p>
      )}
    </main>
  )
}

export default Home
