// PostList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../Client';

function PostList({ posts, setPosts }) {
  async function handleUpvote(postId) {
    try {
      // Update the upvote count directly in the state
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return { ...post, upvotes: post.upvotes + 1 };
        }
        return post;
      });
      setPosts(updatedPosts);

      // Update the upvote count in the database
      await supabase
        .from('posts')
        .update({ upvotes: supabase.sql('upvotes + 1') })
        .eq('id', postId);

      console.log('Post upvoted successfully');
    } catch (error) {
      console.error('Error upvoting post:', error.message);
    }
  }

  return (
    <div className="PostListContainer">
      <h2>Post List</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Upvotes: {post.upvotes}</p>
          <button onClick={() => handleUpvote(post.id)}>Upvote</button>
          <Link to={`/post/${post.id}`}>
            View Post
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PostList;
