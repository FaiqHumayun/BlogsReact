import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const PostsContext = createContext()

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [lastIndex, setLastIndex] = useState(100)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const postsData = JSON.parse(localStorage.getItem('posts'))
    if (!postsData) {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      )
      setPosts(response.data)
      console.log(response.data)
      storeInStorage(response.data)
    } else {
      setPosts(JSON.parse(localStorage.getItem('posts')))
    }
  }

  function storeInStorage(posts){
      console.log('setting the posts in the log storage')
      localStorage.setItem('posts', JSON.stringify(posts))
      console.log('setted the posts in the log storage', localStorage.getItem('posts'))
  }

  function createPost(newPost) {
    const newPostId = lastIndex + 1
    const newPostData = {
      ...newPost,
      id: newPostId,
      userId: JSON.parse(localStorage.getItem('currentUser'))?.id,
    }

    const updatedPosts = [newPostData, ...posts]

    updatePosts(updatedPosts)
    setLastIndex(newPostId)
  }

  function updatePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts))
  }

  function updatePost(updatedPost) {
    const index = posts.findIndex((post) => post.id === updatedPost.id)

    if (index !== -1) {
      const updatedPosts = [...posts]
      updatedPosts[index] = updatedPost
      setPosts(updatedPosts, () => {
        localStorage.setItem('posts', JSON.stringify(updatedPosts))
      })
    } else {
      console.error('Post not found')
    }
  }

  function deletePost(postToDelete) {
    const updatedPosts = posts.filter((post) => post.id !== postToDelete.id)
    updatePosts(updatedPosts)
    setPosts(updatedPosts)
  }

  return (
    <PostsContext.Provider
      value={{
        posts,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export const usePosts = () => useContext(PostsContext)
