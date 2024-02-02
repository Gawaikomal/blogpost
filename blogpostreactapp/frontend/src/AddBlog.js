// AddBlog.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [comment, setComment] = useState('');
  const token = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleAddBlog = async () => {
    try {
      console.log('User:', user);
      console.log('Token:', token);
      
      if (!user || !token) {
        console.error('User is not authenticated or token is missing');
        return;
      }

      const response = await fetch('/api/blog/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          user: user._id,
          comment,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Blog added successfully, you may want to redirect or show a success message
        console.log('Blog added successfully:', data.blog);
        // Redirect to the newly created blog
        window.location.href = `/blogs/${data.blog._id}`;
      } else {
        console.error('Failed to add blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error during adding blog:', error);
    }
  };

  return (
    <div>
      <h2>Add a New Blog</h2>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <label>Comment:</label>
      <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button onClick={handleAddBlog}>Add Blog</button>

      {/* Link to show all blogs */}
      <Link to="/showallblogs">Show All Blogs</Link>
      {/* Link to view the newly created blog */}
      <Link to="/myblogs">My Blogs</Link>
    </div>
  );
};

export default AddBlog;
