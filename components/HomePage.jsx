// HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostList from './PostList'; // Import the PostList component
import { supabase } from '../Client'; // Import the supabase client

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select();

      if (error) {
        console.error('Error fetching posts:', error.message);
      } else {
        console.log('Fetched posts:', data);
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  }

  return (
    <div className="Home">
      <h1>Home Page</h1>
      <Link to="/create-post">Create Post</Link>
      <div className="PostListContainer">
        <h2>Post List</h2>
        <PostList posts={posts} setPosts={setPosts} />
      </div>
    </div>
  );
}

export default HomePage;
