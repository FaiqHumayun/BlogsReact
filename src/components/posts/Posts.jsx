import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useComments } from '../../utils/context/CommentsContext'

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()
  const { setPost } = useComments()

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data,()=>{localStorage.setItem('posts',JSON.stringify(posts))});
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  function navigateToComments(post) {
    setPost(post)
    navigate(`/posts/${post.id}/comments`, { state: { post } });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded shadow" onClick={()=>navigateToComments(post)}>
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="mt-2">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
