// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreatePostPage from './components/CreatePage';
import EditPage from './components/EditPage'; // Import EditPage component
import PostPage from './components/PostPage'; // Import PostPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/edit-post/:postId" element={<EditPage />} />
        <Route path="/post/:postId" element={<PostPage />} /> {/* Add PostPage route */}
      </Routes>
    </Router>
  );
}

export default App;
