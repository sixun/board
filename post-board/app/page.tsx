import PostList from "@/components/post-list"
import PostForm from "@/components/post-form"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Anonymous Post Board</h1>
      <div className="space-y-8">
        <PostForm />
        <PostList />
      </div>
    </main>
  )
}
