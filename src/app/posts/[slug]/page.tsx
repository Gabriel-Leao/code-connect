import CardPost, { Post } from '@/components/CardPost'
import logger from '@/logger'
import prisma from '../../../../prisma/prisma'
import { remark } from 'remark'
import html from 'remark-html'
import { redirect } from 'next/navigation'

const getPost = async (slug: string): Promise<Post | null> => {
  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: { slug },
      include: { author: true }
    })
    logger.info(`post com o slug: ${slug} encontrado com sucessor`)
    const processedContent = await remark().use(html).process(post.markdown)
    post.markdown = processedContent.toString()
    return post
  } catch (error) {
    logger.error(error)
    redirect('/not-found')
  }
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
        <h1 className="text-2xl text-white text-center">
          Não foi possível encontrar o post
        </h1>
      )}
    </>
  )
}

export default page
