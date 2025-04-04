import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = storedUsers.find(user => user.email === email && user.password === password);

    if (foundUser) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('loggedInUser', email);

      // ✅ Store user login data
      let loggedUsers = JSON.parse(localStorage.getItem('loggedUsers')) || [];

      // ✅ Check if user is already logged in to avoid duplicate entries
      if (!loggedUsers.some(user => user.email === email)) {
        loggedUsers.push({ email, timestamp: new Date().toLocaleString() });
      }

      localStorage.setItem('loggedUsers', JSON.stringify(loggedUsers));

      alert('✅ Login successful!');
      navigate('/division-selection'); // Redirect to Division Selection page
    } else {
      setError('❌ Incorrect email or password.');
    }
  };

  return (
    <div className="auth-container">
      <img src="/vishvin.avif" alt="Vishvin Logo" className="logo" />

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn btn-login">Login</button>

        <div className="auth-links">
          <p>Don't have an account?</p>
          <button type="button" className="btn btn-signup" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>

        {/* ✅ Admin Login Button */}
        <div className="admin-login">
          <p>Admin?</p>
          <button type="button" className="btn btn-admin" onClick={() => navigate('/admin-login')}>Admin Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;