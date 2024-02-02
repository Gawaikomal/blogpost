import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      // Implement the API call to /api/signin using fetch or axios
      const response = await fetch('/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      sessionStorage['token'] = data.token;
      sessionStorage.setItem('user', JSON.stringify(data.existingUser));
      //sessionStorage['user'] = data.existingUser;

      // Check if the sign-in was successful based on your API response
      if (response.ok) {
        // Redirect to the Add Blog page upon successful sign-in
        navigate('/addblog');
      } else {
        // Handle unsuccessful sign-in (show error message, etc.)
        console.error('Sign-in failed:', data.message);
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;
