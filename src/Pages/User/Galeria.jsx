import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Asegúrate de que las imágenes están en las rutas correctas dentro del proyecto
import imgActividades from '../../../public/actividades.png';
import imgExtras from '../../../public/extras.png';
import imgInstalaciones from '../../../public/instalaciones.png';

// Contenedor principal con fondo suave y tipografía moderna
const GaleriaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - 80px);
  padding: 40px 20px;
  background-color: #f5f5f5;
  font-family: 'Poppins', sans-serif;
`;

const Subtitulo = styled.p`
  color: #666;
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 40px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  color: #0B8AD9;
  font-size: 2.8em;
  margin-bottom: 10px;
  letter-spacing: 1px;

  @media (max-width: 545px) {
    font-size: 1.5em; /* Ajustamos el tamaño de la fuente para pantallas pequeñas */
    display: block; /* Aseguramos que el título sea visible */
  }
`;


const ImagenesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  width: 100%;
  max-width: 1600px; /* Máximo ancho para pantallas grandes */
`;

const ImagenItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ImagenWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px; /* Ajusta el tamaño de las imágenes */
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const Imagen = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  text-align: center;
  font-size: 1.2em;
`;

const TitleCard = styled.h3`
  font-size: 1.6em;
  margin-bottom: 10px;
  color: #333;
`;

const Description = styled.p`
  font-size: 1em;
  color: #666;
`;

export const Galeria = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <GaleriaContainer>
      <Header>
        <Title>Galería de Fotos</Title>
        <Subtitulo>Descubre momentos capturados de nuestras actividades, instalaciones y eventos especiales.</Subtitulo>
      </Header>

      <ImagenesContainer>
        <ImagenItem onClick={() => handleNavigation('/actividades')}>
          <ImagenWrapper>
            <Imagen src={imgActividades} alt="Actividades" />
          </ImagenWrapper>
          <InfoContainer>
            <TitleCard>Actividades</TitleCard>
            <Description>Explora las actividades que hemos realizado con nuestros participantes.</Description>
          </InfoContainer>
        </ImagenItem>

        <ImagenItem onClick={() => handleNavigation('/instalaciones')}>
          <ImagenWrapper>
            <Imagen src={imgInstalaciones} alt="Instalaciones" />
          </ImagenWrapper>
          <InfoContainer>
            <TitleCard>Instalaciones</TitleCard>
            <Description>Conoce nuestras instalaciones, diseñadas para brindar el mejor servicio.</Description>
          </InfoContainer>
        </ImagenItem>

        <ImagenItem onClick={() => handleNavigation('/extras')}>
          <ImagenWrapper>
            <Imagen src={imgExtras} alt="Extras" />
          </ImagenWrapper>
          <InfoContainer>
            <TitleCard>Extras</TitleCard>
            <Description>Descubre actividades adicionales y eventos especiales.</Description>
          </InfoContainer>
        </ImagenItem>
      </ImagenesContainer>
    </GaleriaContainer>
  );
};
