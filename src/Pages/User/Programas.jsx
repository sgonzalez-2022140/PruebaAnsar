import React from 'react';
import styled from 'styled-components';
import Header from '../../assets/Programas.jpg';
import InfoPrograma from '../../assets/Program.png';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaHandsHelping, FaBoxOpen, FaDonate, FaPhone } from 'react-icons/fa'; // Añadimos íconos de colaboración

const ProgramContainer = styled.div`
  width: 100%;
  margin: 0;
`;

// Ajuste para el diseño responsivo en móviles
const InfoDiv = styled.div`
  color: white;
  width: 100%;
  background-color: #1a73e8;
  height: auto;
  padding: 15px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px;
    font-size: 1.1em;
  }
`;

const ShapeCircle = styled.div`
  width: 300px;
  height: 300px;
  background: #9b9a9a;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin: 0 auto 20px;
  }
`;

// Imagen dentro del círculo
const InfoImage = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
`;

const ProgramDescription = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
  text-align: center;
  padding: 20px;

  @media (max-width: 768px) {
    font-size: 1em;
  }

  strong {
    font-weight: bold;
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)), url(${Header});
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 60px; /* Aumentamos el espacio debajo de las cards */
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    bottom: 10px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 3em;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

// Contenedor para alinear imagen a la izquierda y texto a la derecha
const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ExplanationText = styled.div`
  flex: 1;
  font-size: 1.2em;
  line-height: 1.6;
  padding-left: 50px; /* Para pantallas grandes */
  
  @media (max-width: 768px) {
    font-size: 1em;
    text-align: center;
    padding-left: 0; /* Quitar padding en pantallas pequeñas */
  }

  @media (min-width: 1200px) {
    padding-left: 100px; /* Aumentar el padding para pantallas muy grandes */
  }
`;

const ExplanationTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  padding: 5px;
  @media (max-width: 768px) {
    font-size: 1.8em;
  }
`;

// Lista de programas
const ProgramList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 40px 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px 10px;
  }
`;

const ProgramItem = styled.div`
  background-color: #f4f4f9;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    background-color: #e2e2f1;
  }
`;

const ProgramItemTitle = styled.h2`
  font-size: 1.5em;
  color: #1a73e8;
  margin-bottom: 10px;
`;

const ProgramItemDescription = styled.p`
  font-size: 1.1em;
  line-height: 1.5;
  text-align: justify;
  strong {
    font-weight: bold;
  }
`;

// Footer simple con información de contacto y redes sociales
const Footer = styled.footer`
  background-color: #0B8AD9;
  padding: 20px;
  text-align: center;
  color: white;
  font-family: 'Poppins', sans-serif;
  width: 100%;
  position: relative;
  bottom: 0;
  overflow-x: hidden;
`;

const FooterText = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const SocialIcons = styled.div`
  margin-top: 10px;
  font-size: 1.5rem;

  & > * {
    margin: 0 10px;
    color: white;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #FF4D4D;
    }
  }
`;

export const Programas = () => {
  return (
    <ProgramContainer>
      <HeaderContainer>
        <TextOverlay>
          <HeaderTitle>Programas para los Niños</HeaderTitle>
        </TextOverlay>
      </HeaderContainer>

      <InfoDiv>
        <ProgramDescription>
          <strong>Nuestros programas</strong> están diseñados para brindar apoyo integral a las familias y niños que enfrentan situaciones de desnutrición. Organizamos jornadas médicas especializadas y entregamos víveres para garantizar el bienestar de los más vulnerables.
        </ProgramDescription>
      </InfoDiv>

      <InfoContainer>
        <ShapeCircle>
          <InfoImage src={InfoPrograma} alt="Icono Info Programa" />
        </ShapeCircle>

        <ExplanationText>
          <ExplanationTitle>¿Para qué sirve un programa?</ExplanationTitle>
          Un programa tiene como objetivo estructurar un conjunto de actividades organizadas que se llevan a cabo con la intención de alcanzar una meta específica. En el caso de los programas que brindamos, nuestro enfoque es mejorar la nutrición y la salud infantil en áreas vulnerables, asegurando que los niños reciban el apoyo y tratamiento adecuado.
        </ExplanationText>
      </InfoContainer>

      <center><ExplanationTitle>Características del programa</ExplanationTitle></center> {/* Título añadido */}

      <CardContainer>
        <ProgramItem>
          <div>
            <ProgramItemTitle>Chequeos Médicos</ProgramItemTitle>
            <ProgramItemDescription>
              Ofrecemos <strong>chequeos médicos</strong> regulares para los niños del programa, con el objetivo de detectar y tratar de manera temprana cualquier problema de salud. Estos chequeos incluyen un seguimiento médico continuo para asegurar que los niños reciban el tratamiento adecuado. Nuestro equipo trabaja para garantizar que se atiendan las necesidades de cada niño, proporcionando atención médica oportuna y personalizada según sea necesario.
            </ProgramItemDescription>
          </div>
        </ProgramItem>


        <ProgramItem>
          <div>
            <ProgramItemTitle>Jornada Médica Anual</ProgramItemTitle>
            <ProgramItemDescription>
              Organizamos <strong>jornadas médicas</strong> anualmente en el mes de octubre con la colaboración de un equipo de médicos del <strong>País Vasco, España</strong>. En estas jornadas se brinda atención gratuita a más de 500 pacientes adultos y 250 niños, incluyendo consultas médicas, exámenes de laboratorio y medicamentos sin costo. Además, se identifican a niños en riesgo nutricional, quienes reciben seguimiento y apoyo con víveres y educación en salud para sus familias.
            </ProgramItemDescription>
          </div>
        </ProgramItem>

        <ProgramItem>
          <div>
            <ProgramItemTitle>Entrega de Víveres</ProgramItemTitle>
            <ProgramItemDescription>
              Proporcionamos <strong>víveres y suplementos nutricionales</strong> a las familias más vulnerables. Estos recursos son fundamentales para mejorar la nutrición infantil y garantizar que los niños en riesgo de desnutrición puedan recuperarse adecuadamente. Además de la entrega de alimentos, ofrecemos educación sobre salud y nutrición a las familias, ayudándoles a mantener un estilo de vida saludable y a mejorar su calidad de vida a largo plazo.
            </ProgramItemDescription>
          </div>
        </ProgramItem>

      </CardContainer>

      <Footer>
        <FooterText>© 2024 ANSAR - Todos los derechos reservados</FooterText>
        <SocialIcons>
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
          <FaYoutube /> {/* Añadimos el ícono de YouTube */}
        </SocialIcons>
      </Footer>

    </ProgramContainer>
  );
};
