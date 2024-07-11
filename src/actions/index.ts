'use server'

import { Comment, Post } from '@prisma/client'
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

export const postComment = async (post: Post, formData: FormData) => {
  const author = await prisma.user.findFirst({
    where: {
      username: 'anabeatriz_dev'
    }
  })

  await prisma.comment.create({
    data: {
      text: formData.get('text') as string,
      author_id: author!.id,
      post_id: post.id
    }
  })

  revalidatePath('/')
  revalidatePath(`/posts/${post.slug}`)
}

export const postReply = async (parent: Comment, formData: FormData) => {
  const author = await prisma.user.findFirst({
    where: {
      username: 'anabeatriz_dev'
    }
  })

  const post = await prisma.post.findFirst({
    where: {
      id: parent.post_id
    }
  })

  await prisma.comment.create({
    data: {
      text: formData.get('text') as string,
      author_id: author!.id,
      post_id: post!.id,
      parent_id: parent.parent_id ?? parent.id
    }
  })

  revalidatePath(`/posts/${post!.slug}`)
}
