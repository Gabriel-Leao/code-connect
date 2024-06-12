import CardPost, { Post } from '@/components/CardPost'
import logger from '@/logger'
import Link from 'next/link'

const getPosts = async (page: number) => {
  const response = await fetch(
    `http://localhost:3042/posts?_page=${page}&_per_page=6`
  )
  if (!response.ok) {
    logger.error(`Ocorreu um erro em ${response.url}: ${await response.text()}`)
    return []
  }
  logger.info(`Post obtido com sucesso em ${response.url}`)
  return response.json()
}

const Home = async ({ searchParams }: { searchParams: { page: number } }) => {
  const currentPage = searchParams?.page || 1
  const { data: posts, prev, next } = await getPosts(currentPage)
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
        <p className="text-xl text-white">Carregando posts...</p>
      )}
    </main>
  )
}

export default Home
