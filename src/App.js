import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { PostProvider } from './utils/context/PostsContext'
import { CommentProvider } from './utils/context/CommentsContext'
import Navbar from './components/navbar/Navbar'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {

    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
  }, [])

  useEffect(() => {
    if (!(currentUser || ['/login', '/signup'].includes(location.pathname))) {
      navigate('/login')
    } else if (
      currentUser &&
      ['/login', '/signup'].includes(location.pathname)
    ) {
      navigate('/')
    }
  }, [currentUser])

  return (
    <div className='App'>
      {currentUser ? <Navbar/> : null}
      <PostProvider>
        <CommentProvider>
          <Outlet />
        </CommentProvider>
      </PostProvider>
    </div>
  )
}
