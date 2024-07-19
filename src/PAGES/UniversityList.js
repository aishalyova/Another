import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import './UniversityList.css';

const UniversityList = () => {
  const [universities, setUniversities] = useState([]);
  const [editUniversityId, setEditUniversityId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    location: '',
    status: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/universities');
      setUniversities(response.data);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const handleEditClick = (event, university) => {
    event.preventDefault();
    setEditUniversityId(university.id);

    const formValues = {
      name: university.name,
      location: university.location,
      status: university.status
    };

    setEditFormData(formValues);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const editedUniversity = {
      id: editUniversityId,
      name: editFormData.name,
      location: editFormData.location,
      status: editFormData.status
    };

    try {
      await axios.put(`http://localhost:8080/api/universities/${editUniversityId}`, editedUniversity);
      const newUniversities = [...universities];
      const index = universities.findIndex((university) => university.id === editUniversityId);
      newUniversities[index] = editedUniversity;
      setUniversities(newUniversities);
      setEditUniversityId(null);
    } catch (error) {
      console.error('Error updating university:', error);
    }
  };

  const handleCancelClick = () => {
    setEditUniversityId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/universities/${id}`);
      setUniversities(universities.filter((university) => university.id !== id));
    } catch (error) {
      console.error('Error deleting university:', error);
    }
  };

  const handleAddClick = () => {
    navigate('/main/adduniversity');
  };

  return (
    <div>
      <div className="university-list-container">
        <button className="btn btn-primary add-university-button" onClick={handleAddClick}>
          Add University
        </button>
        <form onSubmit={handleEditFormSubmit}>
          <table className="university-list">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {universities.map((university) => (
                <tr key={university.id}>
                  {editUniversityId === university.id ? (
                    <>
                      <td>{university.id}</td>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="location"
                          value={editFormData.location}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="status"
                          value={editFormData.status}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <button type="submit" className="btn btn-success">
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{university.id}</td>
                      <td>{university.name}</td>
                      <td>{university.location}</td>
                      <td>{university.status}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={(event) => handleEditClick(event, university)}
                        >
                          <i className="fas fa-edit"></i> Update
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(university.id)}
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default UniversityList;
