import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAddConsulta } from '../../Shared/Hooks/Consulta/useAddConsulta';
import { useGetpacientes } from '../../Shared/Hooks/Pacientes/useGetPacientes';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 3px solid #0B8AD9;
  border-right: 3px solid #0B8AD9;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 400px;
  padding: 10px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: black;
  font-weight: bold;
  &:after {
    content: '*';
    color: red;
    margin-left: 5px;
  }
`;

const FormAdvertency = styled.label`
  display: block;
  margin-bottom: 5px;
  color: black;
  font-weight: bold;
  font-size: 0.8em;
`;

const RedAsterisk = styled.span`
  color: red;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${({ invalid }) => (invalid ? 'red' : '#ccc')};
  width: 100%;
  max-width: 900px;
  transition: border-bottom 0.2s ease-in-out;
  &:focus {
    outline: none;
    border-bottom: 2px solid #0CC8F2;
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${({ invalid }) => (invalid ? 'red' : '#ccc')};
  width: 100%;
  max-width: 900px;
  height: 150px;
  transition: border-bottom 0.2s ease-in-out;
  &:focus {
    outline: none;
    border-bottom: 2px solid #0CC8F2;
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ invalid }) => (invalid ? 'red' : '#ccc')};
  border-radius: 5px;
  background-color: white;
  color: black;
  max-width: 900px;
`;

const Button = styled.button`
  background-color: #0b8ad9;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  &:disabled {
    background-color: #97c9f7;
  }
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

export const AddConsulta = ({ onSuccess }) => {
  const {
    consulta,
    handleChange,
    handleSubmit,
    loading,
  } = useAddConsulta(onSuccess);

  const { pacientes, isFetching, getPacientes, error: fetchError } = useGetpacientes();
  const [invalidFields, setInvalidFields] = useState({});

  useEffect(() => {
    getPacientes();
  }, [getPacientes]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChange(e);
    validateField(name, value);
  };

  const validateField = (name, value) => {
    setInvalidFields((prev) => ({
      ...prev,
      [name]: !value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newInvalidFields = {};
    const requiredFields = ['motivo', 'diagnostico', 'tratamiento', 'presupuesto', 'paciente'];

    requiredFields.forEach((field) => {
      if (!consulta[field]) {
        newInvalidFields[field] = true;
      }
    });

    setInvalidFields(newInvalidFields);

    if (Object.values(newInvalidFields).some((value) => value)) {
      toast.error('Por favor, complete todos los campos obligatorios.');
      return;
    }

    handleSubmit(e);
  };

  return (
    <Container>
      <Form onSubmit={handleFormSubmit}>
        <FormAdvertency>
          El <RedAsterisk>*</RedAsterisk> significa que los campos son obligatorios, debe llenarlos todos.
        </FormAdvertency>
        <Column>
          <FormGroup>
            <Label htmlFor="motivo">Motivo:</Label>
            <Textarea
              id="motivo"
              name="motivo"
              value={consulta.motivo}
              onChange={handleFieldChange}
              invalid={invalidFields.motivo}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="diagnostico">Diagnóstico:</Label>
            <Textarea
              id="diagnostico"
              name="diagnostico"
              value={consulta.diagnostico}
              onChange={handleFieldChange}
              invalid={invalidFields.diagnostico}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="tratamiento">Tratamiento:</Label>
            <Textarea
              id="tratamiento"
              name="tratamiento"
              value={consulta.tratamiento}
              onChange={handleFieldChange}
              invalid={invalidFields.tratamiento}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="presupuesto">Precio de consulta:</Label>
            <Input
              type="number"
              id="presupuesto"
              name="presupuesto"
              value={consulta.presupuesto}
              onChange={handleFieldChange}
              invalid={invalidFields.presupuesto}
            />
          </FormGroup>
        </Column>
        <Column>
          <FormGroup>
            <Label htmlFor="paciente">Paciente:</Label>
            {isFetching ? (
              <HashLoader color="#0b8ad9" loading={true} size={50} />
            ) : fetchError ? (
              <ErrorMessage>Error al cargar los pacientes</ErrorMessage>
            ) : (
              <Select
                id="paciente"
                name="paciente"
                value={consulta.paciente}
                onChange={handleFieldChange}
                invalid={invalidFields.paciente}
              >
                <option value="">Selecciona un paciente</option>
                {pacientes.map(paciente => (
                  <option key={paciente._id} value={paciente._id}>
                    {paciente.nombre}
                  </option>
                ))}
              </Select>
            )}
          </FormGroup>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Consulta'}
          </Button>
        </Column>
      </Form>
    </Container>
  );
};
