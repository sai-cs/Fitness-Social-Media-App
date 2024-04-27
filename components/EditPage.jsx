// EditPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../Client';

function EditPage() {
  const { postId } = useParams();
  const [post, setPost] = useState({ title: '', content: '' });

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

  async function handleSave() {
    try {
      await supabase
        .from('posts')
        .update(post)
        .eq('id', postId);

      console.log('Post updated successfully');
      // Redirect to the PostPage after saving
      window.location.href = `/post/${postId}`;
    } catch (error) {
      console.error('Error updating post:', error.message);
    }
  }

  return (
    <div>
      <h1>Edit Post</h1>
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
      <button onClick={handleSave}>Save</button>
      <Link to={`/post/${postId}`}>Cancel</Link>
    </div>
  );
}

export default EditPage;
