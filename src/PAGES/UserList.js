import React, { useEffect, useState } from 'react';
import './UserList.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    university: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/students');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditUserId(user.id);

    const formValues = {
      name: user.name,
      email: user.email,
      university: user.university
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

    const editedUser = {
      id: editUserId,
      name: editFormData.name,
      email: editFormData.email,
      university: editFormData.university
    };

    try {
      await axios.put(`http://localhost:8080/api/students/${editUserId}`, editedUser);
      const newUsers = [...users];
      const index = users.findIndex((user) => user.id === editUserId);
      newUsers[index] = editedUser;
      setUsers(newUsers);
      setEditUserId(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancelClick = () => {
    setEditUserId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/students/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <div className="user-list-container">
        <button className="btn btn-primary add-user-button" onClick={() => navigate('/main/adduser')}>
          Add User
        </button>
        <form onSubmit={handleEditFormSubmit}>
          <table className="user-list">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>University</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  {editUserId === user.id ? (
                    <>
                      <td>{user.id}</td>
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
                          type="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="university"
                          value={editFormData.university}
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
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.university}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={(event) => handleEditClick(event, user)}
                        >
                          <i className="fas fa-edit"></i> Update
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(user.id)}
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

export default UserList;
