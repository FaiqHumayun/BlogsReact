import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from '../src/components/auth/Login';
import Dashboard from '../src/components/dashboard/Dashboard';
import Signup from './components/auth/Signup';
import Posts from './components/posts/Posts'
import Comments from './components/comments/Comments';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index={true} element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/posts/:postId/comments" element={<Comments/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
reportWebVitals();
