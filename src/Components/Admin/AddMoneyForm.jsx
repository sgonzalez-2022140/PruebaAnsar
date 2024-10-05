import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetSaldoPrincipal } from '../../Shared/Hooks/Saldo/useGetSaldoPrincipal';
import { FaMoneyBillWave, FaArrowLeft } from 'react-icons/fa';
//agregar dinero cada que quiera
import { useUpdateSaldo } from '../../Shared/Hooks/Saldo/useUpdateSaldo';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: #f5f5f5;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  width: 30%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SaldoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const ButtonsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
  padding: 20px;
  width: 70%;
  overflow-y: auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CircularButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 20px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 10px #b8b9be, -4px -4px 10px #ffffff;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px 0;
  width: 80%;
  box-shadow: 4px 4px 10px #b8b9be, -4px -4px 10px #ffffff;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #007bff;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
`;

const movimientos = [
  { tipo: 'Gasto', monto: 200, fecha: '2024-08-01' },
  { tipo: 'Ganancia', monto: 500, fecha: '2024-08-02' },
  // Añade más datos de prueba aquí si es necesario
];

export const AddMoneyForm = () => {
  const { saldo, loading: saldoLoading, error: saldoError, refetch } = useGetSaldoPrincipal();
  const { handleUpdate, loading: updateLoading } = useUpdateSaldo(() => refetch());
  const [view, setView] = useState('default');
  const [monto, setMonto] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      const montoNumber = parseFloat(monto);
      
      // Validar que el monto sea mayor que 0 y sea un número válido
      if (isNaN(montoNumber) || montoNumber <= 0) {
          setInputError('Este valor no es permitido. Debe ser un número mayor que 0.');
          return;
      }
      
      setInputError('');  // Limpiar el mensaje de error si la validación es exitosa
      await handleUpdate('66fcc28bd3e5c7aa5f95ab60', montoNumber);  // Enviar solo el monto a sumar/restar
      setView('default');
  };

  const handleMontoChange = (e) => {
      const value = e.target.value;
      setMonto(value);
  };

  return (
      <MainContainer>
          <LeftContainer>
              {view === 'default' ? (
                  <>
                      <SaldoSection>
                          {saldoLoading ? (
                              <div>Cargando saldo...</div>
                          ) : saldoError ? (
                              <div>Error obteniendo el saldo</div>
                          ) : (
                              <>
                                  <h1>Saldo Actual: {saldo}</h1>
                                  <CircularButton onClick={() => setView('addMoney')}>
                                      <FaMoneyBillWave />
                                  </CircularButton>
                              </>
                          )}
                      </SaldoSection>
                      <ButtonsSection>
                          <Button onClick={() => setView('gastos')}>Gastos</Button>
                          <Button onClick={() => setView('ganancias')}>Ganancias</Button>
                      </ButtonsSection>
                  </>
              ) : (
                  <>
                      <Button onClick={() => setView('default')} style={{ marginTop: '20px' }}>
                          <FaArrowLeft /> Regresar
                      </Button>
                      <Form onSubmit={handleSubmit}>
                          <Label>Monto a agregar</Label>
                          <Input
                              type="text"
                              value={monto}
                              onChange={handleMontoChange}
                              required
                          />
                          {inputError && <div style={{ color: 'red', marginBottom: '10px' }}>{inputError}</div>}
                          <Button type="submit" disabled={updateLoading}>
                              {updateLoading ? 'Actualizando...' : 'Agregar'}
                          </Button>
                          <h2>Nuevo Saldo: {saldo + parseFloat(monto) || saldo}</h2> {/* Muestra el nuevo saldo sumado en el front */}
                      </Form>
                  </>
              )}
          </LeftContainer>
          <RightContainer>
              <TableContainer>
                  <Table>
                      <thead>
                          <tr>
                              <th>Tipo</th>
                              <th>Monto</th>
                              <th>Fecha</th>
                          </tr>
                      </thead>
                      <tbody>
                          {movimientos.slice(0, 10).map((mov, index) => (
                              <tr key={index}>
                                  <td>{mov.tipo}</td>
                                  <td>{mov.monto}</td>
                                  <td>{mov.fecha}</td>
                              </tr>
                          ))}
                      </tbody>
                  </Table>
              </TableContainer>
          </RightContainer>
          <ToastContainer />
      </MainContainer>
  );
};