import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DivisionSelection.css';
import tempDatabase from './tempDatabase';

const DivisionSelection = () => {
  const [division, setDivision] = useState('');
  const [subDivision, setSubDivision] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const divisions = [...new Set(tempDatabase.map(user => user.division))];

  const subDivisions = division
    ? [...new Set(tempDatabase.filter(user => user.division === division).map(user => user.subDivision))]
    : [];

  const users = division && subDivision
    ? tempDatabase.filter(user => user.division === division && user.subDivision === subDivision)
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!division || !subDivision || !userId) {
      setError('⚠️ Please select all fields.');
      return;
    }

    const selectedUser = tempDatabase.find(user => user.userid.toString() === userId);
    navigate('/user-details', { state: { userDetails: selectedUser } });
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Select Division, Sub-Division & User</h2>

        <select
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          className="select-box"
        >
          <option value="">Select Division</option>
          {divisions.map(div => (
            <option key={div} value={div}>{div}</option>
          ))}
        </select>

        <select
          value={subDivision}
          onChange={(e) => setSubDivision(e.target.value)}
          className="select-box"
        >
          <option value="">Select Sub-Division</option>
          {subDivisions.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>

        {users.length > 0 && (
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="select-box"
          >
            <option value="">Select User</option>
            {users.map(u => (
              <option key={u.userid} value={u.userid}>{u.name}</option>
            ))}
          </select>
        )}

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn btn-login">Proceed</button>
      </form>
    </div>
  );
};

export default DivisionSelection;
