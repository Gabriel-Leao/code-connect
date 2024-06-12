import { remark } from 'remark'
import html from 'remark-html'
import CardPost, { Post } from '@/components/CardPost'
import logger from '@/logger'

const getPost = async (slug: string): Promise<Post | null> => {
  const response = await fetch(`http://localhost:3042/posts/?slug=${slug}`)
  if (!response.ok) {
    logger.error(`Ocorreu um erro em ${response.url}: ${await response.text()}`)
    return null
  }
  logger.info(`Post obtido com sucesso em ${response.url}`)
  const data = await response.json()
  const post = data[0]

  const processedContent = await remark().use(html).process(post.markdown)
  post.markdown = processedContent.toString()
  return post
}

const page = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug)
  return (
    <>
      {post ? (
        <div>
          <CardPost
            post={post}
            detailsCard={true}
          />
          <h2 className="pb-2 pt-6 text-2xl text-[#888888]">Código:</h2>
          <div
            className="p-4 [&>pre>code]:text-[#BCBCBC] rounded-2xl bg-[#171d1f] [&>pre>code]:text-lg"
            dangerouslySetInnerHTML={{ __html: post.markdown }}></div>
        </div>
      ) : (
        <h1 className="text-2xl text-white">
          Não foi possível encontrar o post
        </h1>
      )}
    </>
  )
}

export default page
