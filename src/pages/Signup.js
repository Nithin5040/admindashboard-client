import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Check if email and password are not empty
    if (!email || !password) {
      setError('❌ Email and Password are required.');
      return;
    }

    let existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // 🔹 Check if user already exists
    if (existingUsers.some(user => user.email === email)) {
      setError('❌ Email already registered. Please log in.');
      return;
    }

    // 🔹 Save new user
    existingUsers.push({ email, password });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // 🔹 Show success message and redirect to Main Page
    setSuccess(true);
    setError('');
    
    setTimeout(() => {
      navigate('/'); // 🔹 Redirect to Main Page ("/") after 2 seconds
    }, 2000);
  };

  return (
    <div className="auth-container">
      <img src="/vishvin.avif" alt="Vishvin Logo" className="logo" />

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Join Us!</h2>

        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <input 
          type="password" 
          placeholder="Create a strong password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">✅ Signup successful! Redirecting to Home...</p>}

        <button type="submit" className="btn btn-signup">Sign Up</button>

        <div className="auth-links">
          <p>Already have an account?</p>
          <button type="button" className="btn btn-login" onClick={() => navigate('/login')}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
