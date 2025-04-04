import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const ADMIN_EMAIL = "admin@example.com";
  const ADMIN_PASSWORD = "admin@example.com";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('loggedInUser', 'Admin');
      alert('✅ Admin Login successful!');
      navigate('/admin-profile'); 
    } else {
      setError('❌ Incorrect admin credentials.');
    }
  };

  return (
    <div className="auth-container">
      <img src="/vishvin.avif" alt="Vishvin Logo" className="logo" />
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Admin Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn btn-admin">Login as Admin</button>
      </form>
    </div>
  );
};

export default AdminLogin;  