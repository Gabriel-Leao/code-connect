'use server'

import { Post } from '@prisma/client'
import prisma from '../../prisma/prisma'
import { revalidatePath } from 'next/cache'

export const incrementThumbsUp = async (post: Post) => {
  await prisma.post.update({
    where: { id: post.id },
    data: { likes: { increment: 1 } }
  })
  revalidatePath('/')
  revalidatePath(`/posts/${post.slug}`)
}
