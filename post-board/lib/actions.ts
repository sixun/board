"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createPost(content: string) {
  try {
    await prisma.post.create({
      data: {
        content,
      },
    })

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Failed to create post:", error)
    throw new Error("Failed to create post")
  }
}

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return posts
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return []
  }
}
