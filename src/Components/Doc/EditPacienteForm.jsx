import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUpdatePaciente } from '../../Shared/Hooks/Pacientes/useUpdatePaciente';
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

const FormDate = styled.div`
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  max-width: 400px;
  @media (max-width: 768px) {
    max-width: 100%;
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

const FormInputDate = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: white;
    color: black;
    text-align: center;
    outline: none;
    transition: border-bottom 0.2s ease-in-out;
    &:focus {
        outline: none;
        border-bottom: 2px solid #0CC8F2;
    }
    border: 1px solid ${({ invalid }) => (invalid ? 'red' : 'white')};
`;

const FormSelect = styled.select`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    width: 100%;
    max-width: 400px;

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

// Para formatear la fecha para los inputs
const formatDate = (date) => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset()); // Suma la diferencia de horarios para que no se desfase la hora
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  const year = d.getFullYear();
  return { year, month, day };
};

// -------- Componente
export const EditPacienteForm = ({ pacienteData, onBack, onSuccess }) => {
  const { handleUpdate, loading, error, success } = useUpdatePaciente(onSuccess);

  // Campos de paciente
  const [paciente, setPaciente] = useState({
    nombre: '',
    sexo: '',
    YYYY: '',
    MM: '',
    DD: '',
    fechaDeNacimiento: '',
    telefono: '',
    direccion: '',
  });

  // Settea los datos a los campos para la edición
  useEffect(() => {
    if (pacienteData) {
      const { year, month, day } = formatDate(pacienteData.fechaDeNacimiento);
      setPaciente({
        ...pacienteData,
        nombre: pacienteData.nombre || '',
        sexo: pacienteData.sexo || '',
        DD: day || '',
        MM: month || '',
        YYYY: year || '',
        telefono: pacienteData.telefono || '',
        direccion: pacienteData.direccion || '',
      });
    }
  }, [pacienteData]);

  // Actualiza los datos por medio de seteo hacía el updatedPaciente, donde recibe los datos que ya se tenían, junto con los cambios realizados
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente((prevPaciente) => {
      const updatedPaciente = {
        ...prevPaciente,
        [name]: value,
      };
      // Se le agrega a los datos que fueron cambiados la fecha de la forma YYYY-MM-DD
      updatedPaciente.fechaDeNacimiento = `${updatedPaciente.YYYY}-${updatedPaciente.MM}-${updatedPaciente.DD}`;

      return updatedPaciente;
    });
  };

  // Al precionar el botón manda los datos al hook
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(paciente._id, paciente);
  };

  // ---------- Formulario
  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormField>
          <FormLabel>Nombre:</FormLabel>
          <FormInput
            type="text"
            name="nombre"
            value={paciente.nombre}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <FormLabel>Sexo:</FormLabel>
          <FormSelect
            name="sexo"
            value={paciente.sexo}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            <option value="M">M</option>
            <option value="F">F</option>
          </FormSelect>
        </FormField>
        <FormField>
          <FormLabel>Fecha de Nacimiento:</FormLabel>
          <FormDate>
            <FormInputDate
              type="text"
              name="DD"
              value={paciente.DD}
              onChange={handleChange}
              placeholder='DD'
            />
            <span>/</span>
            <FormInputDate
              type="text"
              name="MM"
              value={paciente.MM}
              onChange={handleChange}
              placeholder='MM'
            />
            <span>/</span>
            <FormInputDate
              type="text"
              name="YYYY"
              value={paciente.YYYY}
              onChange={handleChange}
              placeholder='YYYY'
            />
          </FormDate>
        </FormField>
        <FormField>
          <FormLabel>Telefono:</FormLabel>
          <FormInput
            type="text"
            name="telefono"
            value={paciente.telefono}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <FormLabel>Dirección:</FormLabel>
          <FormInput
            type="text"
            name="direccion"
            value={paciente.direccion}
            onChange={handleChange}
          />
        </FormField>
        <FormButton type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </FormButton>
      </form>
    </FormContainer>
  );
};
