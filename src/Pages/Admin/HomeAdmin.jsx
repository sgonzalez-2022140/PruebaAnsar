import styled from 'styled-components';
import { useState } from 'react';
import { FaUserInjured, FaUserMd, FaPills, FaMoneyBillWave, FaClipboardList, FaCalendarAlt } from 'react-icons/fa';
import { ModalView } from '../../Components/Admin/ModalView';



const HomeContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.$bgColor};  /* Nota el uso de $ antes de bgColor */
  cursor: pointer;
`;

const GridTitle = styled.h2`
  margin-top: 10px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2em;
  color: #666;
  margin-bottom: 20px;
`;

export const HomeAdmin = () => {
  const [modalContent, setModalContent] = useState(null);

  const handleGridItemClick = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <>      
      <HomeContainer>
        <Title>¡Bienvenido Administrador!</Title>
        <Subtitle>Dale click o toca cualquier icono para saber su funcionalidad dentro del sistema</Subtitle>
        <GridContainer>
          <GridItem 
            $bgColor="#f8d7da" 
            onClick={() => handleGridItemClick({ title: 'Pacientes', text: 'Información sobre los pacientes...', image: 'ruta/a/imagen1.jpg' })}
          >
            <FaUserInjured size={50} />
            <GridTitle>Pacientes</GridTitle>
          </GridItem>
          <GridItem 
            $bgColor="#d4edda" 
            onClick={() => handleGridItemClick({ title: 'Trabajadores', text: 'Información sobre los trabajadores...', image: 'ruta/a/imagen2.jpg' })}
          >
            <FaUserMd size={50} />
            <GridTitle>Trabajadores</GridTitle>
          </GridItem>
          <GridItem 
            $bgColor="#d1ecf1" 
            onClick={() => handleGridItemClick({ title: 'Medicinas', text: 'Información sobre las medicinas...', image: 'ruta/a/imagen3.jpg' })}
          >
            <FaPills size={50} />
            <GridTitle>Medicinas</GridTitle>
          </GridItem>
          <GridItem 
            $bgColor="#fff3cd" 
            onClick={() => handleGridItemClick({ title: 'Saldos', text: 'Información sobre los saldos...', image: 'ruta/a/imagen4.jpg' })}
          >
            <FaMoneyBillWave size={50} />
            <GridTitle>Saldos</GridTitle>
          </GridItem>
          <GridItem 
            $bgColor="#cce5ff" 
            onClick={() => handleGridItemClick({ title: 'Consultas', text: 'Información sobre las consultas...', image: 'ruta/a/imagen5.jpg' })}
          >
            <FaClipboardList size={50} />
            <GridTitle>Consultas</GridTitle>
          </GridItem>
          <GridItem 
            $bgColor="#f0e68c" 
            onClick={() => handleGridItemClick({ title: 'Eventos', text: 'Información sobre los eventos...', image: 'ruta/a/imagen6.jpg' })}
          >
            <FaCalendarAlt size={50} />
            <GridTitle>Eventos</GridTitle>
          </GridItem>
        </GridContainer>
      </HomeContainer>
      <ModalView 
        show={modalContent !== null} 
        onClose={closeModal} 
        content={modalContent || {}} 
      />
    </>
  );
};