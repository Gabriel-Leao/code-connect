import CardPost, { PostWithAuthor } from '@/components/CardPost'
import logger from '@/logger'
import Link from 'next/link'
import prisma from '../../prisma/prisma'
import Image from 'next/image'

const getPosts = async (page: number, searchTerm: string) => {
  try {
    let where = {}
    if (searchTerm) {
      where = {
        title: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }
    }

    const take = 6
    const skip = (page - 1) * take
    const prev = page > 1 ? page - 1 : false
    const totalPage = Math.ceil((await prisma.post.count({ where })) / take)
    const next = page < totalPage ? page + 1 : null
    const posts = await prisma.post.findMany({
      where,
      take,
      skip,
      include: { author: true },
      orderBy: { created_at: 'desc' }
    })
    logger.info('Posts encontrados com sucesso')
    return { posts, next, prev }
  } catch (error) {
    logger.error(error)
    throw new Error('Não foi possível carregar os posts')
  }
}

const Home = async ({
  searchParams
}: {
  searchParams: { page: string; q: string }
}) => {
  const currentPage = parseInt(searchParams?.page) || 1
  const searchTerm = searchParams?.q
  const { posts, prev, next } = await getPosts(currentPage, searchTerm)
  return (
    <main>
      {posts.length ? (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-14">
            {posts.map((post: PostWithAuthor) => (
              <CardPost
                post={post}
                key={post.id}
              />
            ))}
          </div>
          <div className="flex justify-center gap-6">
            {prev && (
              <Link
                href={{ pathname: '/', query: { q: searchTerm, page: prev } }}
                className="text-[#81FE88] underline underline-offset-2">
                Página anterior
              </Link>
            )}
            {next && (
              <Link
                href={{ pathname: '/', query: { q: searchTerm, page: next } }}
                className="text-[#81FE88] underline underline-offset-2">
                Próxima página
              </Link>
            )}
          </div>
        </>
      ) : searchTerm ? (
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/no-search-results.svg"
            alt="Lupa sem ter resultado encontrado"
            width={48}
            height={72}
          />
          <p className="text-2xl text-[#BCBCBC]">
            Nenhum resultado encontrado para sua busca, tente um termo
            diferente.
          </p>
        </div>
      ) : (
        <p className="text-xl text-white text-center">Carregando posts...</p>
      )}
    </main>
  )
}

export default Home
