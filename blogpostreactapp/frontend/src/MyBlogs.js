import React, { useState, useEffect } from 'react';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    // Fetch blog posts from your API endpoint
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`api/blog/${user._id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBlogs(data.blogs);
        } else {
          console.error('Failed to fetch blogs:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array to ensure it runs only once on component mount

  return (
    <div>
      <h1>Blog Page</h1>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
  <li key={blog._id}>
    <strong>{blog.title}</strong> - {blog.description}
    <p>Created by: {blog.user.name}</p>
    {/* Other components or logic */}
  </li>
))}
        </ul>
      )}
    </div>
  );
};

export default MyBlogs;
