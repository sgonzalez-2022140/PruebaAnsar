import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetpacienteAdmin } from '../../Shared/Hooks/Pacientes/useGetPacienteAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserInjured } from "react-icons/fa";
import { HashLoader } from 'react-spinners'; 

const PacienteBanner = styled.div`
    display: flex; 
    align-items: center; 
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    position: relative;
`;
const PacienteIcon = styled.div`
    margin-right: 15px;
    color: #0B8AD9;
`;

const BannerTitle = styled.div`
    width: 100%;
    margin: 0;
    font-size: 32px;
    font-weight: bold;
    display: flex;
    justify-content: center;
`;
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const PacientesContainer = styled.div`
    width: 100%;
    padding: 20px;
    position: relative; 
`;

const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
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
`;

const PacienteCardTitle = styled.h2`
  margin-top: 0;
  font-weight: bold;
`;

const PacienteCardBody = styled.div`
  margin: 10px 0;
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

const NoPacientesMessage = styled.p`
  text-align: center;
  width: 100%;
`;

export const PacientesAdmin = () => {
    const { pacientes, isFetching, getPacientes } = useGetpacienteAdmin();
    const [pageIndex, setPageIndex] = useState(0);
    const [query, setQuery] = useState('');
    const [filteredPacientes, setFilteredPacientes] = useState([]);
    const itemsPerPage = 4;

    useEffect(() => {
        getPacientes();
    }, [getPacientes]);

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

    const handlePageChange = (index) => {
        setPageIndex(index);
    };

    const paginatedPacientes = filteredPacientes ? filteredPacientes.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage) : [];
    const totalPages = filteredPacientes ? Math.ceil(filteredPacientes.length / itemsPerPage) : 0;

    return (
        <PageContainer>
            <PacienteBanner>
                <PacienteIcon>
                    <FaUserInjured size={50}/>
                </PacienteIcon>
                <BannerTitle>Pacientes Admin</BannerTitle>
            </PacienteBanner>
            <PacientesContainer>
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
                    <CardsContainer>
                        {paginatedPacientes && paginatedPacientes.length > 0 ? (
                            paginatedPacientes.map(paciente => (
                                <PacienteCard key={paciente._id}>
                                    <PacienteCardBody>
                                        <PacienteCardTitle>{paciente.nombre}</PacienteCardTitle>
                                        <p><Label>Edad:</Label> {paciente.edad}</p>
                                        <p><Label>Sexo:</Label> {paciente.sexo}</p>
                                        <p><Label>Teléfono:</Label> {paciente.telefono}</p>
                                        <p><Label>Dirección:</Label> {paciente.direccion}</p>
                                        <p><Label>Doctor a cargo:</Label> {paciente.user.name}</p>
                                    </PacienteCardBody>
                                </PacienteCard>
                            ))
                        ) : (
                            <NoPacientesMessage>No hay pacientes disponibles.</NoPacientesMessage>
                        )}
                    </CardsContainer>
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
            <ToastContainer />
        </PageContainer>
    );
};
