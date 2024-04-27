import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../Client';

function CreatePage({ onUpdatePostList }) {
  const [post, setPost] = useState({ title: '', content: '' });

  async function createPost() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{ title: post.title, content: post.content }])
        .single();

      if (error) {
        console.error('Error creating post:', error.message);
      } else {
        console.log('Post created successfully');
        setPost({ title: '', content: '' });
        onUpdatePostList(data[0]); // Update post list on the homepage
      }
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  }

  return (
    <div className="create">
      <h1>Create Post</h1>
      <input
        placeholder="Title"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <input
        placeholder="Content"
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
      />
      <button onClick={createPost}>Create Post</button>
      <Link to="/">Back</Link>
    </div>
  );
}

export default CreatePage;
