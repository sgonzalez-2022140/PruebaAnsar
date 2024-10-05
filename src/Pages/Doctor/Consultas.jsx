import React, { useEffect, useState } from 'react';
import { FaStethoscope, FaPlusCircle, FaList, FaUserInjured, FaClipboardList } from 'react-icons/fa';
import styled from 'styled-components';
import { AddConsulta } from '../../Components/Doc/AddConsulta';
import { GetConsultasForm } from '../../Components/Doc/GetConsultasForm';
import { GetPacienteForm } from '../../Components/Doc/GetPacienteForm';
import { GetConsultaPorPaciente } from '../../Components/Doc/GetConsultaPorPaciente';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConsultasContainer = styled.div`
  padding: 20px;
`;

const ConsultasBanner = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  position: relative;
`;

const ConsultasIcon = styled.div`
  color: #0B8AD9;
`;

const ConsultasTitle = styled.div`
  width: 100%;
  margin: 0;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  justify-content: center;
`;

const ConsultasButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ConsultasButtons = styled.div`
  display: flex;
  width: 100%;
  max-width: 820px;
  justify-content: center;
  margin: 0 auto;
`;

const ConsultasButtonLeft = styled.button`
  width: 50%;
  max-width: 410px;
  background-color: #0b8ad9;
  color: white;
  border: none;
  padding: 10px 0;
  margin: 0;
  border-radius: 5px 0 0 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #097bb8;
  }
  &.active {
    background-color: #005f99;
  }
  &:disabled {
    background-color: #97c9f7;
  }
`;

const ConsultasButtonRight = styled.button`
  width: 50%;
  max-width: 410px;
  background-color: #0b8ad9;
  color: white;
  border: none;
  padding: 10px 0;
  margin: 0;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #097bb8;
  }
  &.active {
    background-color: #005f99;
  }
  &:disabled {
    background-color: #97c9f7;
  }
`;

const ConsultasContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 820px;
  width: 100%;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 10px;
  }
`;

const OptionsButton = styled.button`
  flex: 1;
  background-color: #0b8ad9;
  color: white;
  border: none;
  padding: 10px 0;
  margin: 10px 0; 
  border-radius: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #097bb8;
  }
  &:active {
    background-color: #005f99;
  }
`;

const CustomButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
`;

export const Consultas = () => {
  const [view, setView] = useState('crear');
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  const handleViewChange = (newView) => {
    setView(newView);
    setActiveComponent(null);
    setSelectedPaciente(null);
  };

  const handleBack = () => {
    if (activeComponent === 'GetConsultaPorPaciente') {
      setActiveComponent('GetPacienteForm');
    } else {
      setActiveComponent(null);
      setSelectedPaciente(null);
    }
  };

  const handlePacienteSelect = (paciente) => {
    setSelectedPaciente(paciente);
    setActiveComponent('GetConsultaPorPaciente');
  };

  return (
    <ConsultasContainer>
      <ConsultasBanner>
        <ConsultasIcon>
          <FaStethoscope size={50} />
        </ConsultasIcon>
        <ConsultasTitle>Consultas</ConsultasTitle>
      </ConsultasBanner>
      <ConsultasButtonsContainer>
        <ConsultasButtons>
          <ConsultasButtonLeft
            className={view === 'crear' ? 'active' : ''}
            onClick={() => handleViewChange('crear')}
          >
            <FaPlusCircle style={{ marginRight: '10px' }} /> Crear
          </ConsultasButtonLeft>
          <ConsultasButtonRight
            className={view === 'ver' ? 'active' : ''}
            onClick={() => handleViewChange('ver')}
          >
            <FaList style={{ marginRight: '10px' }} /> Ver
          </ConsultasButtonRight>
        </ConsultasButtons>
      </ConsultasButtonsContainer>
      <ConsultasContent>
        {view === 'crear' ? (
          <div>
            <AddConsulta />
          </div>
        ) : activeComponent === 'GetPacienteForm' ? (
          <GetPacienteForm onBack={handleBack} onPacienteSelect={handlePacienteSelect} />
        ) : activeComponent === 'GetConsultaPorPaciente' ? (
          <GetConsultaPorPaciente pacienteId={selectedPaciente._id} onBack={handleBack} />
        ) : activeComponent === 'GetConsultasForm' ? (
          <GetConsultasForm onBack={handleBack} />
        ) : (
          <CustomButtons>
            <OptionsButton onClick={() => setActiveComponent('GetPacienteForm')}>
              <FaUserInjured style={{ marginRight: '10px' }} /> Mis Pacientes
            </OptionsButton>
            <OptionsButton onClick={() => setActiveComponent('GetConsultasForm')}>
              <FaClipboardList style={{ marginRight: '10px' }} /> Mis consultas
            </OptionsButton>
          </CustomButtons>
        )}
        <ToastContainer />
      </ConsultasContent>
    </ConsultasContainer>
  );
};
