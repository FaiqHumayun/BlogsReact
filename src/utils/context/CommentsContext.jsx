import { createContext, useContext } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const CommentsContext = createContext()

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([])
  const [lastIndex, setLastIndex] = useState(1000)
  const [post, setPost] = useState('')

  useEffect(() => {
    fetchComments()
  }, [])

  async function fetchComments() {
    const commentsData = JSON.parse(localStorage.getItem('comments'))
    if (!commentsData) {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/comments'
      )
      setComments(response.data)
      storeInStorage(response.data)
    } else {
      setComments(JSON.parse(localStorage.getItem('comments')))
    }
  }

  function storeInStorage(comments){
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  function createComment(newComment, post) {
    const newCommentId = lastIndex + 1
    const newCommentData = {
      ...newComment,
      id: newCommentId,
      name: JSON.parse(localStorage.getItem('currentUser'))?.name,
      email: JSON.parse(localStorage.getItem('currentUser'))?.email,
      postId: post.id
    }

    const updatedComments = [newCommentData, ...comments]

    updateComments(updatedComments)
    setLastIndex(newCommentId)
  }

  function updateComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  function updateComment(updatedComment) {
    const index = comments.findIndex((comment) => comment.id === updatedComment.id)

    if (index !== -1) {
      const updatedComments = [...comments]
      updatedComments[index] = updatedComment
      setComments(updatedComments, () => {
        localStorage.setItem('comments', JSON.stringify(updatedComments))
      })
    } else {
      console.error('Comment not found')
    }
  }

  function deleteComment(commentToDelete) {
    if (commentToDelete.userId === JSON.parse(localStorage.getItem('currentUser')).id) {
      const updatedComments = comments.filter((comment) => comment.id !== commentToDelete.id)
      updateComments(updatedComments)
      setComments(updatedComments)
    }
  }

  return (
    <CommentsContext.Provider
      value={{
        comments,
        createComment,
        updateComment,
        deleteComment,
        setPost,
        post
      }}
    >
      {children}
    </CommentsContext.Provider>
  )
}

export const useComments = () => useContext(CommentsContext)
