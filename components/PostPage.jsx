// PostPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../Client';

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('id', postId)
        .single();

      if (error) {
        console.error('Error fetching post:', error.message);
      } else {
        console.log('Fetched post:', data);
        setPost(data);
      }
    } catch (error) {
      console.error('Error fetching post:', error.message);
    }
  }

  async function handleDelete() {
    try {
      await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      console.log('Post deleted successfully');
      // Optionally, redirect to the homepage after deletion
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Post Page</h1>
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
      <div>
        <Link to={`/edit-post/${postId}`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default PostPage;
