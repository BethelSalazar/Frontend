// src/pages/Home.jsx
import React from 'react';
import './Home.css';
import tutorOnlineImage from '../assets/chic.jpg';

const Home = () => {
  return (
    <div className="home-page">
      <div className="content">
        <h1 className="title">
          Tutor <span className="highlight">Online</span>
        </h1>
        <p className="subtitle">Aprende de los mejores instructores</p>
        <div className="buttons">
          <button className="btn primary">Iniciar</button>
          <button className="btn secondary">Leer más</button>
        </div>
      </div>
      <div className="image-container">
        <img src={tutorOnlineImage} alt="Tutor Online" className="image" />
      </div>
    </div>
  );
};

export default Home;


