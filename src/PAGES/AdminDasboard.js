import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 

function AdminDashboard() {
  return (
    <header className="admin-dashboard">
      <div className="dashboard-top">
     <img src={logo} alt="Logo" className="logo" />
        <h1>UNICAMPUS</h1>
      </div>
      <nav className="dashboard-bottom">
        <Link to="/main/home">Home</Link>
        <Link to="/main/aboutus">About</Link>
        <Link to="/main/newslist">News List</Link>
        <Link to="/main/userlist">User List</Link>
        <Link to="/main/universitylist">University List</Link>
        <Link to="/">Log Out</Link>
      </nav>
    </header>
  );
}

export default AdminDashboard;
