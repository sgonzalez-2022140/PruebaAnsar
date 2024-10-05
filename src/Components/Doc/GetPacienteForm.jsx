import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetpacientes } from '../../Shared/Hooks/Pacientes/useGetPacientes';
import { FaUserInjured, FaArrowLeft } from "react-icons/fa";
import { HashLoader } from 'react-spinners';

// --------- Estilos
const PacienteBanner = styled.div`
  display: flex; 
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
`;

const PacienteIcon = styled.div`
  color: #0B8AD9;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #0B8AD9;
  font-size: 24px;
  position: absolute;
  margin-bottom: 20px;
  top: 20px;
  left: 20px;
  &:hover {
    color: #005f99;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
`;

const PacientesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra los elementos en el contenedor */
`;

const PacienteCard = styled.div`
  position: relative;
  border: 3px solid #0B8AD9;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  width: 300px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const PacienteCardTitle = styled.h2`
  margin-top: 0;
  font-weight: bold;
`;

const Label = styled.span`
  font-weight: bold;
`;

const RadioButtons = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const RadioButton = styled.div`
  background-color: #ccc;
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;

  ${({ checked }) => checked && `
    background-color: #007bff;
    color: white;
  `}
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  color: #000;
  transition: border-bottom 0.2s ease-in-out;
  &:focus {
    outline: none;
    border-bottom: 2px solid #0B8AD9;
  }
`;

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8); 
    z-index: 999; 
`;

const NoPacientesMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

// ------ Componente 
export const GetPacienteForm = ({ onBack, onPacienteSelect }) => {
  const { pacientes, isFetching, getPacientes } = useGetpacientes();
  const [query, setQuery] = useState('');
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    getPacientes();
  }, [getPacientes]);

  // Filtros para la búsqueda de pacientes por cualquier valor
  useEffect(() => {
    if (pacientes) {
      setFilteredPacientes(
        pacientes.filter(paciente =>
          Object.values(paciente).some(value =>
            value.toString().toLowerCase().includes(query.toLowerCase())
          )
        )
      );
    }
  }, [query, pacientes]);

  // Páginación para cuando los datos excenden de los item por página (4)
  const paginatedPacientes = filteredPacientes ? filteredPacientes.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage) : [];
  const totalPages = filteredPacientes ? Math.ceil(filteredPacientes.length / itemsPerPage) : 0;

  // Página inicial
  const handlePageChange = (index) => {
    setPageIndex(index);
  };

  return (
    <PageContainer>
      <PacientesContainer>
        <BackButton onClick={onBack}>
          <FaArrowLeft />
        </BackButton>
        <PacienteBanner>
          <PacienteIcon>
            <FaUserInjured size={75} />
          </PacienteIcon>
        </PacienteBanner>
        <SearchBar
          type="text"
          placeholder="Barra de búsqueda"
          onChange={e => setQuery(e.target.value)}
        />
        {isFetching ? (
          <LoaderContainer>
            <HashLoader color="#0b8ad9" loading={true} size={50} />
          </LoaderContainer>
        ) : (
          <>
            {paginatedPacientes.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {paginatedPacientes.map(paciente => (
                  <PacienteCard key={paciente._id} onClick={() => onPacienteSelect(paciente)}>
                    <PacienteCardTitle>{paciente.nombre}</PacienteCardTitle>
                    <p><Label>Edad:</Label> {paciente.edad}</p>
                    <p><Label>Sexo:</Label> {paciente.sexo}</p>
                    <p><Label>Teléfono:</Label> {paciente.telefono}</p>
                    <p><Label>Dirección:</Label> {paciente.direccion}</p>
                  </PacienteCard>
                ))}
              </div>
            ) : (
              <NoPacientesMessage>
                <p>No hay pacientes disponibles.</p>
              </NoPacientesMessage>
            )}
          </>
        )}
      </PacientesContainer>
      <RadioButtons>
        {Array.from({ length: totalPages }, (_, index) => (
          <RadioButton
            key={index}
            onClick={() => handlePageChange(index)}
            checked={pageIndex === index}
          >
            {index + 1}
          </RadioButton>
        ))}
      </RadioButtons>
    </PageContainer>
  );
};
