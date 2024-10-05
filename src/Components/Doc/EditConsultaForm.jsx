import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUpdateConsulta } from '../../Shared/Hooks/Consulta/useUpdateConsulta.jsx'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// -------- Estilos
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2),
              10px 0 10px rgba(0, 0, 0, 0.5); /* sombra más pronunciada a la derecha */
  border-bottom: 3px solid #0B8AD9;
  border-right: 3px solid #0B8AD9;
  @media (max-width: 768px) {
      padding: 10px;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    color: black;
    font-weight: bold;
`;

const FormInput = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    max-width: 400px;
    transition: border-bottom 0.2s ease-in-out;
    &:focus {
        outline: none;
        border-bottom: 2px solid #0CC8F2;
    }
    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

const FormButton = styled.button`
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #0B8AD9;
    color: white;
    cursor: pointer;
    margin-top: 10px;

    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;

// -------- Componente
export const EditConsultaForm = ({ consultaData, onBack, onSuccess }) => {
  const { handleUpdate, loading, error, success } = useUpdateConsulta(onSuccess);

  // Campos de consulta
  const [consulta, setConsulta] = useState({
    motivo: '',
    diagnostico: '',
    tratamiento: '',
    presupuesto: '',
  });

  // Settea los datos a los campos para la edición
  useEffect(() => {
    if (consultaData) {
      setConsulta({
        ...consultaData,
        motivo: consultaData.motivo || '',
        diagnostico: consultaData.diagnostico || '',
        tratamiento: consultaData.tratamiento || '',
        presupuesto: consultaData.presupuesto || '',
      });
    }
  }, [consultaData]);

  // Actualiza los datos por medio de seteo hacia el updatedConsulta, donde recibe los datos que ya se tenían, junto con los cambios realizados
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsulta((prevConsulta) => ({
      ...prevConsulta,
      [name]: value,
    }));
  };

  // Al presionar el botón manda los datos al hook
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(consulta._id, consulta);
  };

  // ---------- Formulario
  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormField>
          <FormLabel>Motivo:</FormLabel>
          <FormInput
            type="text"
            name="motivo"
            value={consulta.motivo}
            onChange={handleChange}
            readOnly
          />
        </FormField>
        <FormField>
          <FormLabel>Diagnóstico:</FormLabel>
          <FormInput
            type="text"
            name="diagnostico"
            value={consulta.diagnostico}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <FormLabel>Tratamiento:</FormLabel>
          <FormInput
            type="text"
            name="tratamiento"
            value={consulta.tratamiento}
            onChange={handleChange}
            readOnly
          />
        </FormField>
        <FormField>
          <FormLabel>Presupuesto:</FormLabel>
          <FormInput
            type="number"
            name="presupuesto"
            value={consulta.presupuesto}
            onChange={handleChange}
            readOnly
          />
        </FormField>
        <FormButton type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </FormButton>
      </form>
    </FormContainer>
  );
};
