import { getPosts } from "@/lib/actions"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

async function Posts() {
  const posts = await getPosts()

  if (posts.length === 0) {
    return <div className="text-center p-8 text-muted-foreground">No posts yet. Be the first to post something!</div>
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent className="pt-6">
            <p className="whitespace-pre-wrap break-words">{post.content}</p>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground border-t px-6 py-3">
            Posted {formatDistanceToNow(new Date(post.createdAt))} ago
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default function PostList() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">Recent Posts</h2>
      <Suspense fallback={<PostSkeleton />}>
        <Posts />
      </Suspense>
    </div>
  )
}

function PostSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
          <CardFooter className="border-t px-6 py-3">
            <Skeleton className="h-4 w-32" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
