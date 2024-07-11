import CardPost, { PostWithAuthorAndComments } from '@/components/CardPost'
import logger from '@/logger'
import prisma from '../../../../prisma/prisma'
import { remark } from 'remark'
import html from 'remark-html'
import { redirect } from 'next/navigation'
import CommentList from '@/components/CommentList'

const getPost = async (
  slug: string
): Promise<PostWithAuthorAndComments | null> => {
  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: { slug },
      include: {
        author: true,
        comments: {
          include: { author: true, children: { include: { author: true } } },
          where: { parent_id: null }
        }
      }
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
      <CardPost
        post={post!}
        detailsCard={true}
      />
      <div>
        <h2 className="pb-2 pt-6 text-2xl text-[#888888]">Código:</h2>
        <div
          className="p-4 [&>pre>code]:text-[#BCBCBC] rounded-2xl bg-[#171d1f] [&>pre>code]:text-lg"
          dangerouslySetInnerHTML={{ __html: post!.markdown }}
        />
      </div>
      <div className="bg-[#878787] p-8 mt-10 max-h-[839px] rounded-2xl">
        <h2 className="text-[#171D1F] text-2xl pb-6">Comentários</h2>
        <CommentList comments={post!.comments} />
      </div>
    </>
  )
}

export default page
