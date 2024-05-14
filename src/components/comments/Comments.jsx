import { useEffect} from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentForm from '../Forms/CommentForm'
import { useComments } from '../../utils/context/CommentsContext'
import { usePosts } from '../../utils/context/PostsContext'

export default function Comments(props) {
  const [comments, setComments] = useState([])
  const [selectedComment, setSelectedComment] = useState(null)
  const { posts } = usePosts()
  const { post, setPost, deleteComment } = useComments()
  const params = useParams()

  useEffect(() => {
    fetchComments()
  }, [])

  async function fetchComments() {
    setPost(posts.find((post)=> post.id == params.postId))
    setComments(JSON.parse(localStorage.getItem('comments'))?.filter(
      (comment) =>
        comment.postId ===
        post.id
    ))
  }

  const handleCommentClick = (comment) => {
    setSelectedComment(comment)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Post</h1>
        <div key={post.id} className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p className="mt-2">{post.body}</p>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">All Comments</h1>
      <CommentForm comment={selectedComment} post={post} onCancel={() => setSelectedComment(null)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {comments.map(comment => (
          <div key={comment.id}>
          <div
            onClick={() => {
              handleCommentClick(comment)
            }}
            className="bg-white p-4 rounded shadow">
            <p className="mt-2">{comment.body}</p>
          </div>
          <button onClick={() => deleteComment(comment)}>Delete this post</button>
          </div>
        ))}
      </div>
    </div>
  );
}
