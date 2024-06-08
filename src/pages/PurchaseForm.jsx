import React, { useState } from 'react';
import './PurchaseForm.css';

const PurchaseForm = ({ classData, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const purchaseData = {
      name,
      email,
      cardNumber,
      expirationDate,
      cvv
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(purchaseData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Compra exitosa:', result);
        alert('Se ha completado el pago');
      } else {
        const errorData = await response.json();
        console.error('Error en la compra:', errorData);
        alert('Error en la compra: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud: ' + error.message);
    }

    setLoading(false);
    onClose();
  };

  return (
    <div className="purchase-form-overlay">
      <div className="purchase-form">
        <h2>Comprar {classData.title}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Número de tarjeta:</label>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
          </div>
          <div>
            <label>Fecha de expiración:</label>
            <input type="text" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required />
          </div>
          <div>
            <label>CVV:</label>
            <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading}>Confirmar Compra</button>
        </form>
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>
    </div>
  );
};

export default PurchaseForm;

