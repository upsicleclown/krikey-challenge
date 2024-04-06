import React, { useState, useEffect } from 'react';
import './App.css';
import profileImage from './profile_picture.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircleXmark} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [authors, setAuthors] = useState([]);
  
  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`);
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <div className="header-content">
          <div className="back-button" onClick={() => window.history.back()}><FontAwesomeIcon icon={faArrowLeft} /></div>
          <h1 className="title">Authors</h1>
        </div>
      </header>
      <div className="author-list">
        
      {authors.map((author, index) => (
        <div key={index} className="author">
          <img src={profileImage} alt="" className="profile-picture"></img>

          <div className='author-info'>
            <div className='author-name'>{author.author_name}</div>
            <div className='author-email'>{author.email}</div>
          </div>
          
          <div className="delete-author" onClick={() => {}}><FontAwesomeIcon icon={faCircleXmark} /></div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;