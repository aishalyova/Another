import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AddUniversity.css';

const AddUniversity = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState({
    name: '',
    location: '',
    status: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/universities/${id}`)
        .then(response => {
          setUniversity(response.data);
        })
        .catch(error => {
          console.error('Error fetching university data:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUniversity({ ...university, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id 
      ? axios.put(`http://localhost:8080/api/universities/${id}`, university)
      : axios.post('http://localhost:8080/api/universities', university);

    request
      .then(response => {
        console.log('University saved successfully:', response.data);
        navigate('/main/universitylist');
      })
      .catch(error => {
        console.error('Error saving university:', error);
      });
  };

  const handleCancel = () => {
    navigate('/main/universitylist');
  };

  return (
    <div className="university-form-container">
      <h2>{id ? 'Update' : 'Add'} University</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={university.name} onChange={handleChange} required />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={university.location} onChange={handleChange} required />
        </label>
        <label>
          Status:
          <input type="text" name="status" value={university.status} onChange={handleChange} required />
        </label>
        <div className="form-buttons">
          <button type="submit">{id ? 'Save' : 'Add'}</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddUniversity;
