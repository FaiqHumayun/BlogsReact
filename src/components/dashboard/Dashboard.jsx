import { usePosts } from '../../utils/context/PostsContext'
import PostForm from '../Forms/PostForm'
import { useState } from 'react'

export default function Dashboard() {
  const { posts, deletePost } = usePosts()
  const [selectedPost, setSelectedPost] = useState(null)

  function PostCard({ title, body }) {
    return (
      <div className='rounded p-4 mb-4 cursor-pointer'>
        <h2 className='text-lg font-bold mb-2'>{title}</h2>
        <p className='text-gray-700'>{body}</p>
      </div>
    )
  }

  const handlePostClick = (post) => {
    setSelectedPost(post)
  }

  return (
    <div className='mx-auto container flex flex-col'>
      <div className='py-8'>
        <h1 className='text-2xl font-bold mb-4'>My posts</h1>
        <PostForm post={selectedPost} onCancel={() => setSelectedPost(null)} />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {posts.filter((post)=> post.userId === JSON.parse(localStorage.getItem('currentUser')).id).map((post) => (
            <div key={post.id}>
              <div
                className='border'
                onClick={() => {
                  handlePostClick(post)
                }}
              >
                <PostCard title={post.title} body={post.body} />
              </div>
              <button onClick={() => deletePost(post)}>Delete this post</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
