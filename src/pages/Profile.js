import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';


const Profile = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    const currentUser = localStorage.getItem('loggedInUser');

    if (!loggedIn) {
      alert('❌ Please log in first!');
      navigate('/login');
    } else {
      setLoggedInUser(currentUser);
    }
  }, [navigate]);

  return (
    <div className="auth-container">
      <h2>Welcome, {loggedInUser}!</h2>
      <p>You are successfully logged in.</p>

      <div className="button-group">
        <button className="btn-back" onClick={() => navigate('/')}>⬅ Back to Login</button>
        <button className="btn-logout" onClick={() => { 
          localStorage.removeItem('loggedIn'); 
          localStorage.removeItem('loggedInUser'); 
          navigate('/'); 
        }}>🚪 Logout</button>
      </div>
    </div>
  );
};

export default Profile;