import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [loggedUsers, setLoggedUsers] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!isAdmin) {
      alert('❌ Access Denied! Admins only.');
      navigate('/login');
    } else {
      fetchLoggedUsers();
    }
  }, [navigate]);

  const fetchLoggedUsers = () => {
    const loggedInUsers = JSON.parse(localStorage.getItem('loggedUsers')) || [];
    setLoggedUsers(loggedInUsers);
  };

  const handleClearData = () => {
    localStorage.removeItem('loggedUsers');
    setLoggedUsers([]);
    alert('✅ All user data has been cleared!');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const exportAllUsersToCSV = () => {
    const data = JSON.parse(localStorage.getItem('allUsers')) || [];
  
    if (data.length === 0) {
      alert('⚠️ No submission data found!');
      return;
    }
  
    const rows = [['User ID', 'Name', 'Latitude', 'Longitude', 'Date', 'Time']];
  
    data.forEach(entry => {
      const latLong = entry.location.match(/Lat:\s*([\d.-]+),\s*Lon:\s*([\d.-]+)/);
      const lat = latLong ? latLong[1] : '';
      const lon = latLong ? latLong[2] : '';
  
      rows.push([entry.id, entry.name, lat, lon, entry.timestamp]);
    });
  
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(row => row.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `All_Submissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <div className="auth-container">
      <h2>Admin Dashboard</h2>
      <h3>All Logged-in Users</h3>

      {loggedUsers.length > 0 ? (
        <ul className="user-list">
          {loggedUsers.map((user, index) => (
            <li key={index}>{user.email} - {user.timestamp}</li>
          ))}
        </ul>
      ) : (
        <p>No users logged in yet.</p>
      )}

<div className="button-group">
  <button className="btn-refresh" onClick={fetchLoggedUsers}>🔄 Refresh Data</button>
  <button className="btn-clear" onClick={handleClearData}>🗑 Clear User Data</button>
  <button className="btn-download" onClick={exportAllUsersToCSV}>📥 Submissions CSV</button>
  <button className="btn-logout" onClick={handleLogout}>🚪 Logout</button>
</div>
    </div>
  );
};

export default AdminProfile;
