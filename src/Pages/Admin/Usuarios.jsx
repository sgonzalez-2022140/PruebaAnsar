import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUserPlus, FaUserMd, FaBriefcase, FaArrowLeft } from 'react-icons/fa';
import { AgregarUsuario } from '../../Components/Admin/AgregarUsuario';
import { useDoctors } from '../../Shared/Hooks/USER/useDoctors';
import { HashLoader } from 'react-spinners'; 

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const LeftColumn = styled.div`
  width: 30%;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const RightColumn = styled.div`
  width: 65%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Box = styled.div`
  background-color: #e0e0e0;
  padding: 40px;
  border-radius: 10px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background-color: ${props => props.bgColor};
  color: white;
  padding: 20px;
  margin: 15px 0;
  border: none;
  border-radius: 8px; /* Bordes más redondeados */
  cursor: pointer;
  width: 80%;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Añadir sombra al botón */
  transition: all 0.3s ease; /* Animación de transición */

  &:hover {
    background-color: ${props => props.hoverColor};
    transform: translateY(-3px); /* Efecto de elevación en hover */
  }
`;

const BackButton = styled.button`
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #5a6268;
  }
`;

const ButtonIcon = styled.span`
  margin-right: 10px;
`;

const SearchBar = styled.input`
  width: 91%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  color: #000;
`;

const DoctorList = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative; 
`;

const DoctorCard = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  width: 90%;
  display: flex;
  align-items: center;
  text-align: left;
  flex-direction: column;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    width: 45%;
    flex-direction: row;
  }
`;

const DoctorInfo = styled.div`
  flex: 1;
`;

const DoctorPhoto = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 5px;
  margin-top: 10px;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 20px;
  }
`;

const RadioButtons = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  input[type="radio"] {
    display: none;
  }

  label {
    background-color: #ccc;
    padding: 10px 15px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;
  }

  input[type="radio"]:checked + label {
    background-color: #007bff;
    color: white;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8); 
  z-index: 999; 
`;

export const Usuarios = () => {
  const [showAgregarUsuario, setShowAgregarUsuario] = useState(false);
  const [showDoctorInfo, setShowDoctorInfo] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const { doctors, getDoctors, isFetching } = useDoctors();
  

  useEffect(() => {
    if (showDoctorInfo) {
      getDoctors();
    }
  }, [showDoctorInfo]);

  useEffect(() => {
    if (doctors) {
      const filtered = doctors.filter(doctor =>
        Object.values(doctor).some(value =>
          value.toString().toLowerCase().includes(query.toLowerCase())
        )
      );
      setFilteredDoctors(filtered);
      setPageIndex(0); 
    }
  }, [query, doctors]);

  // Para pruebas, podrías ignorar la paginación y mostrar todo:
  const displayedDoctors = filteredDoctors.slice(0, filteredDoctors.length);

  const handleAgregarUsuarioClick = () => {
    setShowAgregarUsuario(true);
  };

  const handleBackClick = () => {
    setShowAgregarUsuario(false);
    setShowDoctorInfo(false);
    setQuery('');
    setFilteredDoctors([]);
  };

  const handleDoctorInfoClick = () => {
    setShowDoctorInfo(true);
    setQuery('');
    setFilteredDoctors([]);
  };

  const totalPages = filteredDoctors ? Math.ceil(filteredDoctors.length / 6) : 0;

  const handlePageChange = (index) => {
    setPageIndex(index);
  };

  return (
    <Container>
      <h1>Aquí puedes administrar a los usuarios del sistema</h1>
      <Box>
        {showAgregarUsuario ? (
          <>
            <AgregarUsuario />
            <BackButton onClick={handleBackClick}>
              <ButtonIcon>
                <FaArrowLeft />
              </ButtonIcon>
              Regresar
            </BackButton>
          </>
        ) : showDoctorInfo ? (
          <>
            <BackButton onClick={handleBackClick}>
              <ButtonIcon>
                <FaArrowLeft />
              </ButtonIcon>
              Regresar
            </BackButton>
            <SearchBar
              type="text"
              placeholder="Barra de búsqueda"
              onChange={e => setQuery(e.target.value)}
            />
            <DoctorList>
              {isFetching ? (
                <LoaderContainer>
                  <HashLoader color="#007bff" loading={true} size={50} />
                </LoaderContainer>
              ) : filteredDoctors && filteredDoctors.length > 0 ? (
                filteredDoctors
                  .slice(pageIndex * 6, pageIndex * 6 + 6)
                  .map((doctor) => {
                    const imageUrl = `http://localhost:2659${doctor.imagesUser[0]}`;
                    return (
                      <DoctorCard key={doctor._id}>
                        <DoctorInfo>
                          <p><strong>Nombre:</strong> {doctor.name} {doctor.lastname}</p>
                          <p><strong>Área:</strong> {doctor.area}</p>
                          <p><strong>Horario:</strong> {doctor.horario}</p>
                          <p><strong>Teléfono:</strong> {doctor.phone}</p>
                        </DoctorInfo>
                        {doctor.imagesUser && doctor.imagesUser.length > 0 && (
                          <DoctorPhoto src={imageUrl} alt="Foto del doctor" />
                        )}
                      </DoctorCard>
                    );
                  })
              ) : (
                <p>No hay doctores disponibles</p>
              )}
            </DoctorList>
            <RadioButtons>
              {Array.from({ length: totalPages }, (_, index) => (
                <React.Fragment key={index}>
                  <input
                    type="radio"
                    id={`page-${index}`}
                    name="pages"
                    checked={pageIndex === index}
                    onChange={() => handlePageChange(index)}
                  />
                  <label htmlFor={`page-${index}`}>{index + 1}</label>
                </React.Fragment>
              ))}
            </RadioButtons>
          </>
        ) : (
          <>
            <Button bgColor="#007bff" hoverColor="#0056b3" onClick={handleAgregarUsuarioClick}>
              <ButtonIcon>
                <FaUserPlus />
              </ButtonIcon>
              Agregar Usuarios
            </Button>
            <Button bgColor="#e7431a" hoverColor="#c82333" onClick={handleDoctorInfoClick}>
              <ButtonIcon>
                <FaUserMd />
              </ButtonIcon>
              Información de Doctores
            </Button>
            <Button bgColor="#ffc107" hoverColor="#e0a800">
              <ButtonIcon>
                <FaBriefcase />
              </ButtonIcon>
              Información de Trabajadores
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};
  