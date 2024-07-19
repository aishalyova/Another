import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('user'); // Default role is 'user'

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here

    if (role === 'admin') {
      navigate('/main/home'); // Redirect to AdminDashboard after login
    } else {
      navigate('/userdashboard/*'); // Redirect to UserDashboard after login
    }
  };

  return (
    <div className="container">
      <input id="signup_toggle" type="checkbox" />
      <form className="form" onSubmit={handleLogin}>
        <div className="form_front">
          <div className="form_details">Login</div>
          <input type="text" className="input" placeholder="Username" required/>
          <input type="password" className="input" placeholder="Password"  required/>
          <select className="input" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <Link to ="/main/home"><button className="btn" type="submit">Login</button></Link>
          <span className="switch">
            Don't have an account?
         <label htmlFor="signup_toggle" className="signup_tog">Sign Up</label>
          </span>
        </div>
        <div className="form_back">
          <div className="form_details">SignUp</div>
          <input type="text" className="input" placeholder="Firstname" />
          <input type="text" className="input" placeholder="Username" />
          <input type="password" className="input" placeholder="Password"/>
          <input type="password" className="input" placeholder="Confirm Password"/>
          <button className="btn" type="submit">Signup</button>
          <span className="switch">
            Already have an account?
            <label htmlFor="signup_toggle" className="signup_tog">Sign In</label>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
