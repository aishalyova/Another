import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AddUser.css';

const AddUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: '',
    email: '',
    university: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/students/${id}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id 
      ? axios.put(`http://localhost:8080/api/students/${id}`, user)
      : axios.post('http://localhost:8080/api/students', user);

    request
      .then(response => {
        console.log('User saved successfully:', response.data);
        navigate('/main/userlist');
      })
      .catch(error => {
        console.error('Error saving user:', error);
      });
  };

  const handleCancel = () => {
    navigate('/main/userlist');
  };

  
  return (
    <div className="user-form-container">
      <h2>{id ? 'Update' : 'Add'} User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={user.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleChange} required />
        </label>
        <label>
          University:
          <input type="text" name="university" value={user.university} onChange={handleChange} required />
        </label>
        <div className="form-buttons">
          <button type="submit">{id ? 'Save' : 'Add'}</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
