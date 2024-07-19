import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewsList.css';

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/news');
      setNewsList(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/news/${id}`);
      setNewsList(newsList.filter((news) => news.id !== id));
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const handleAdd = () => {
    navigate('/main/addnews');
  };

  const filteredNews = newsList.filter((news) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="actions">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
        />
        <button className="btn btn-success" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Add News
        </button>
      </div>

      <table className="news-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Contents</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredNews.map((news) => (
            <tr key={news.id}>
              <td>{news.id}</td>
              <td>{news.title}</td>
              <td>{news.contents ? news.contents.substring(0, 100) : 'No content available'}...</td>
              <td>{news.date}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => navigate(`/addnews/${news.id}`)}
                >
                  <i className="fas fa-edit"></i> Update
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(news.id)}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsList;
