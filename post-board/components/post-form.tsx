"use client"

import type React from "react"

import { useState } from "react"
import { createPost } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function PostForm() {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await createPost(content)
      setContent("")
      toast({
        title: "Success!",
        description: "Your post has been published.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish your post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-card">
      <h2 className="text-xl font-medium">Create a new post</h2>
      <Textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[120px]"
        required
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || !content.trim()}>
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  )
}
