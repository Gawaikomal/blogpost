import React, { useState, useEffect } from 'react';

const ShowAllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog/');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data.blogs);
          setCommentInputs(Object.fromEntries(data.blogs.map((blog) => [blog._id, ''])));
        } else {
          console.error('Failed to fetch blogs:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleCommentSubmit = async (blogId) => {
    try {
      const response = await fetch(`/api/comment/${blogId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: commentInputs[blogId] }),
      });

      if (response.ok) {
        const updatedBlogsResponse = await fetch('/api/blog/');
        const updatedBlogsData = await updatedBlogsResponse.json();
        setBlogs(updatedBlogsData.blogs);
        setCommentInputs((prevInputs) => ({ ...prevInputs, [blogId]: '' }));
      } else {
        console.error('Failed to submit comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error during comment submission:', error);
    }
  };

  return (
    <div>
      <h2>All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id}>
              <strong>{blog.title}</strong> - {blog.description}

              <div>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={commentInputs[blog._id]}
                  onChange={(e) => setCommentInputs((prevInputs) => ({ ...prevInputs, [blog._id]: e.target.value }))}
                />
                <button onClick={() => handleCommentSubmit(blog._id)}>Submit Comment</button>
              </div>

              <ul>
                {blog.comments.map((comment) => (
                  <li key={comment._id}>
                    <div>{comment.comment}</div> 
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowAllBlogs;
