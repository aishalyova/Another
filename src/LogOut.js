import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/loginform');
  };

  return (
    <div className="logout-container">
       <header className="admin-dashboard">
      <div className="dashboard-top">
     <img src={logo} alt="Logo" className="logo" />
        <h1>UNICAMPUS</h1>
      </div>
      <nav className="dashboard-bottom">
        <Link to="/home">Home</Link>
        <Link to="/aboutus">About</Link>
        <Link to="/newslist">News List</Link>
        <Link to="/userlist">User List</Link>
        <Link to="/universitylist">University List</Link>
        <Link to="contactus">ContactUs</Link>
        <Link to="/">Log Out</Link>
      </nav>
    </header>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Confirm Logout</button>
    </div>
  );
};

export default LogOut;
