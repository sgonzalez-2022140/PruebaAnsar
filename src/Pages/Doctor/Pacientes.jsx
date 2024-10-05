import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetpacientes } from '../../Shared/Hooks/Pacientes/useGetPacientes';
import { AddPacienteForm } from '../../Components/Doc/AddPacienteForm';
import { EditPacienteForm } from '../../Components/Doc/EditPacienteForm';
import Modal from '../../Components/Admin/Modal';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { MdAddCircleOutline } from "react-icons/md";
import { useDeletePaciente } from '../../Shared/Hooks/Pacientes/useDeletePaciente';
import { ToastContainer, toast } from 'react-toastify';
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
    color: #0B8AD9
`;

const BannerTitle = styled.div`
    width: 100%;
    margin: 0;
    font-size: 32px;
    font-weight: bold;
    display: flex;
    justify-content: center
`;
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const PacientesContainer = styled.div`
    width: 100%;
    padding: 20px;
`;

const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
`;

const FloatingButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
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

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
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
    height: 100vh; /* Usa 100% si quieres que ocupe solo el contenedor padre */
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8); /* Fondo semi-transparente para mejor visibilidad */
    z-index: 999; /* Asegúrate de que esté encima de otros elementos */
`;

const NoPacientesMessage = styled.p`
  text-align: center;
  width: 100%;
`;

export const Pacientes = () => {
    const { pacientes, isFetching, getPacientes } = useGetpacientes();
    const [view, setView] = useState('options');
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [query, setQuery] = useState('');
    const [filteredPacientes, setFilteredPacientes] = useState([]);
    const itemsPerPage = 4;

    const { handleDelete, loading: deleteLoading, error: deleteError } = useDeletePaciente(() => {
        toast.success('Paciente eliminado correctamente!');
        getPacientes();
    });

    useEffect(() => {
        getPacientes();
    }, [getPacientes]);

    useEffect(() => {
        if (deleteError) {
            toast.error(`Error: ${deleteError}`);
        }
    }, [deleteError]);

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

    const handleSuccess = () => {
        getPacientes();
        setShowAddModal(false);
        setShowEditModal(false);
    };

    const handleEditClick = (paciente) => {
        setSelectedPaciente(paciente);
        setShowEditModal(true);
    };

    const handleDeleteClick = (paciente) => {
        handleDelete(paciente._id);
    };

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
                <BannerTitle>Pacientes</BannerTitle>
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
                                    <PacienteCardBody onClick={() => handleEditClick(paciente)}>
                                        <PacienteCardTitle>{paciente.nombre}</PacienteCardTitle>
                                        <p><Label>Edad:</Label> {paciente.edad}</p>
                                        <p><Label>Sexo:</Label> {paciente.sexo}</p>
                                        <p><Label>Teléfono:</Label> {paciente.telefono}</p>
                                        <p><Label>Dirección:</Label> {paciente.direccion}</p>
                                    </PacienteCardBody>
                                    <DeleteButton onClick={(e) => { e.stopPropagation(); handleDeleteClick(paciente); }}>
                                        <FaTrash size={20} color="red" />
                                    </DeleteButton>
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

            <FloatingButton onClick={() => setShowAddModal(true)}>+</FloatingButton>

            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Agregar"
                icon={MdAddCircleOutline}
            >
                <AddPacienteForm onBack={() => setShowAddModal(false)} onSuccess={handleSuccess} />
            </Modal>

            <Modal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                title="Editar"
                icon={FaRegEdit}

            >
                {selectedPaciente && (
                    <EditPacienteForm
                        pacienteData={selectedPaciente}
                        onBack={() => setShowEditModal(false)}
                        onSuccess={handleSuccess}
                    />
                )}
            </Modal>
            <ToastContainer />
        </PageContainer>
    );
};
