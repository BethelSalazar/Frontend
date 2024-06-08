// src/components/Clase/Clase.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './Clase.css';

const Clase = ({ src, alt, title, description, delay }) => {
  const [comprando, setComprando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    metodoPago: 'tarjeta',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica para procesar la compra, como enviar los datos del formulario a un servidor, etc.
    console.log(formData);
    alert(`Gracias por comprar la clase: ${title}!`);
    setComprando(false); // Importante: asegúrate de cambiar el estado de comprando después de procesar la compra
  };

  return (
    <div className="product" style={{ animationDelay: `${delay}s` }}>
      <img src={src} alt={alt} />
      <h3>{title}</h3>
      <p>{description}</p>
      {!comprando ? (
        <button onClick={() => setComprando(true)}>Comprar</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleInputChange}
            required
          />
          <select
            name="metodoPago"
            value={formData.metodoPago}
            onChange={handleInputChange}
            required
          >
            <option value="tarjeta">Tarjeta de crédito</option>
            <option value="paypal">PayPal</option>
            <option value="transferencia">Transferencia bancaria</option>
          </select>
          <button type="submit">Confirmar compra</button>
        </form>
      )}
    </div>
  );
};

export default Clase;