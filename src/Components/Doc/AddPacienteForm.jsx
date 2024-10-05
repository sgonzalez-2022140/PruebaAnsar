import React, { useState, useRef } from 'react';
import { useAddPaciente } from '../../Shared/Hooks/Pacientes/useAddPaciente';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

// ------- Estilos para cada propiedad
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

const FormInput = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${({ invalid }) => (invalid ? 'red' : '#ccc')};
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
    width: 100%;
    padding: 10px;
    border: 1px solid ${({ invalid }) => (invalid ? 'red' : '#ccc')};
    border-radius: 5px;
    background-color: white;
    color: black;
    
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

// --------- Componente 
export const AddPacienteForm = ({ onBack, onSuccess }) => {
    const { paciente, handleChange, handleSubmit, loading } = useAddPaciente(onSuccess);
    const [invalidFields, setInvalidFields] = useState({});

    // Referencias para los inputs para que "enfoque" al siguiente cuando este tenga una longitud máxima 
    const ddRef = useRef(null);
    const mmRef = useRef(null);
    const yyyyRef = useRef(null);

    // Pasa a la siguiente referencia
    const handleKeyUp = (e, maxLength, nextRef) => {
        if (e.target.value.length === maxLength) {
            nextRef.current.focus();
        }
    };

    // Valida el input según los cambios
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        handleChange(e);
        validateField(name, value);
    };

    // Valida que los inputs sean llenados si no actuaiza su estado
    const validateField = (name, value) => {
        setInvalidFields((prev) => ({
            ...prev,
            [name]: !value
        }));
    };
    
    // Si los campos están siendo agregados correctamente llama al handleSubmit, de lo contrario tira error
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newInvalidFields = {};
        const requiredFields = ['nombre', 'sexo', 'DD', 'MM', 'YYYY', 'telefono', 'direccion'];

        requiredFields.forEach((field) => {
            if (!paciente[field]) {
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
        <>
            <FormContainer>
                <form onSubmit={handleFormSubmit}>
                    <FormAdvertency>
                        El <RedAsterisk>*</RedAsterisk> significa que los campos son obligatorios, debe llenarlos todos.
                    </FormAdvertency>
                    <FormField>
                        <FormLabel>Nombre:</FormLabel>
                        <FormInput
                            type="text"
                            name="nombre"
                            value={paciente.nombre}
                            onChange={handleFieldChange}
                            invalid={invalidFields.nombre}
                        />
                    </FormField>
                    <FormField>
                        <FormLabel>Sexo:</FormLabel>
                        <FormSelect
                            name="sexo"
                            value={paciente.sexo}
                            onChange={handleFieldChange}
                            invalid={invalidFields.sexo}
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
                                onChange={handleFieldChange}
                                onKeyUp={(e) => handleKeyUp(e, 2, mmRef)}
                                placeholder="DD"
                                maxLength={2}
                                ref={ddRef}
                                invalid={invalidFields.DD}
                            />
                            <span>/</span>
                            <FormInputDate
                                type="text"
                                name="MM"
                                value={paciente.MM}
                                onChange={handleFieldChange}
                                onKeyUp={(e) => handleKeyUp(e, 2, yyyyRef)}
                                placeholder="MM"
                                maxLength={2}
                                ref={mmRef}
                                invalid={invalidFields.MM}
                            />
                            <span>/</span>
                            <FormInputDate
                                type="text"
                                name="YYYY"
                                value={paciente.YYYY}
                                onChange={handleFieldChange}
                                placeholder="YYYY"
                                maxLength={4}
                                ref={yyyyRef}
                                invalid={invalidFields.YYYY}
                            />
                        </FormDate>
                    </FormField>
                    <FormField>
                        <FormLabel>Telefono:</FormLabel>
                        <FormInput
                            type="text"
                            name="telefono"
                            value={paciente.telefono}
                            onChange={handleFieldChange}
                            invalid={invalidFields.telefono}
                        />
                    </FormField>
                    <FormField>
                        <FormLabel>Dirección:</FormLabel>
                        <FormInput
                            type="text"
                            name="direccion"
                            value={paciente.direccion}
                            onChange={handleFieldChange}
                            invalid={invalidFields.direccion}
                        />
                    </FormField>
                    <FormButton type="submit" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar'}
                    </FormButton>
                </form>
            </FormContainer>
        </>
    );
};
