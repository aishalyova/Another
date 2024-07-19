import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AddNews.css';

const AddNews = () => {
  const { id } = useParams();
  const [news, setNews] = useState({
    title: '',
    contents: '',
    date: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/news/${id}`)
        .then(response => {
          setNews(response.data);
        })
        .catch(error => {
          console.error('Error fetching news data:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews({ ...news, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id 
      ? axios.put(`http://localhost:8080/api/news/${id}`, news)
      : axios.post('http://localhost:8080/api/news', news);

    request
      .then(response => {
        console.log('News saved successfully:', response.data);
        navigate('/main/newslist');
      })
      .catch(error => {
        console.error('Error saving news:', error);
      });
  };

  const handleCancel = () => {
    navigate('/main/newslist');
  };

  return (
    <div className="news-form-container">
      <h2>{id ? 'Update' : 'Add'} News</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={news.title} onChange={handleChange} required />
        </label>
        <label>
          Contents:
          <textarea name="contents" value={news.contents} onChange={handleChange} required />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={news.date} onChange={handleChange} required />
        </label>
        <div className="form-buttons">
          <button type="submit">{id ? 'Save' : 'Add'}</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddNews;
