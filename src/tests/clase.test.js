import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import PurchaseForm from '../components/PurchaseForm';

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('Pruebas para el componente PurchaseForm', () => {
  it('Verifica que los datos se envíen correctamente al servicio web desde el formulario', async () => {
    render(<PurchaseForm classData={{ title: 'Título de prueba' }} onClose={() => {}} />);
    
    fireEvent.change(screen.getByLabelText('Nombre:'), { target: { value: 'Nombre de prueba' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'correo@prueba.com' } });
    fireEvent.change(screen.getByLabelText('Número de tarjeta:'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Fecha de expiración:'), { target: { value: '12/25' } });
    fireEvent.change(screen.getByLabelText('CVV:'), { target: { value: '123' } });

    fireEvent.submit(screen.getByText('Confirmar Compra'));

    expect(axios.post).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts',
      {
        name: 'Nombre de prueba',
        email: 'correo@prueba.com',
        cardNumber: '1234567890',
        expirationDate: '12/25',
        cvv: '123',
      }
    );

    // Espera a que la promesa de axios se resuelva para que se complete la prueba
    await screen.findByText('Se ha completado el pago');
  });

  it('Asegura que el botón de confirmar compra esté deshabilitado durante la carga', async () => {
    render(<PurchaseForm classData={{ title: 'Título de prueba' }} onClose={() => {}} />);

    expect(screen.getByText('Confirmar Compra')).not.toBeDisabled();
    
    fireEvent.click(screen.getByText('Confirmar Compra'));
    
    expect(screen.getByText('Confirmar Compra')).toBeDisabled();

    // Espera a que la promesa de axios se resuelva para que se complete la prueba
    await screen.findByText('Se ha completado el pago');
  });

  it('Simula el cierre del formulario después de una compra exitosa', async () => {
    const onCloseMock = jest.fn();
    render(<PurchaseForm classData={{ title: 'Título de prueba' }} onClose={onCloseMock} />);

    fireEvent.submit(screen.getByText('Confirmar Compra'));

    // Espera a que la promesa de axios se resuelva para que se complete la prueba
    await screen.findByText('Se ha completado el pago');

    expect(onCloseMock).toHaveBeenCalled();
  });
});
