// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AddBlog from './AddBlog';
import ShowAllBlogs from './ShowAllBlogs';
import MyBlogs from './MyBlogs';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Welcome to blogging App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addblog" element={<AddBlog />} />
        <Route path="/showallblogs" element={<ShowAllBlogs />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
