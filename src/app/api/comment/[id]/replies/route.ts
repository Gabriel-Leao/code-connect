import prisma from '../../../../../../prisma/prisma'

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } }
) => {
  const replies = await prisma.comment.findMany({
    where: { parent_id: params.id },
    include: { author: true }
  })
  return Response.json(replies)
}
