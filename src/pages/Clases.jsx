// src/pages/Clases.jsx
import React, { useEffect, useState } from 'react';
import './Clases.css';
import axios from 'axios';
import PurchaseForm from './PurchaseForm';

const Clases = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/classes')
      .then(response => {
        setClasses(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
        setClasses(exampleClasses); // Usar clases de ejemplo si falla la carga
        setLoading(false);
      });
  }, []);

  const exampleClasses = [
    {
      id: 1,
      src: "https://picsum.photos/id/0/300/200",
      alt: "Clase de Matemáticas",
      title: "Clase de Matemáticas",
      description: "Aprende cálculo y álgebra avanzada",
      delay: 0
    },
    {
      id: 2,
      src: "https://picsum.photos/id/21/300/200",
      alt: "Clase de Arte",
      title: "Clase de Arte",
      description: "Descubre tu creatividad con pintura y escultura",
      delay: 0.2
    },
    {
      id: 3,
      src: "https://picsum.photos/id/237/300/200",
      alt: "Clase de Música",
      title: "Clase de Música",
      description: "Aprende a tocar instrumentos y teoría musical",
      delay: 0.4
    }
  ];

  const handleBuyClick = (classData) => {
    setSelectedClass(classData);
  };

  const handleCloseForm = () => {
    setSelectedClass(null);
  };

  return (
    <div className="page Clases">
      <h1>Clases</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="class-list">
          {classes.map(clase => (
            <div key={clase.id} className="class-card">
              <img src={clase.src} alt={clase.alt} className="class-image" />
              <div className="class-content">
                <h2>{clase.title}</h2>
                <p>{clase.description}</p>
                <button className="buy-button" onClick={() => handleBuyClick(clase)}>Comprar</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedClass && (
        <PurchaseForm classData={selectedClass} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default Clases;




