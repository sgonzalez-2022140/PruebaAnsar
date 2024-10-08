import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaHandsHelping, FaBoxOpen, FaDonate, FaPhone } from 'react-icons/fa'; // Añadimos íconos de colaboración
import Banner from '../../assets/Niños.png';
import BannerCompu from '../../assets/NiñosResolu2.png';
import Kids from '../../assets/Kids.json'
import { useLottie } from "lottie-react";

// Animación para la aparición de la imagen
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Configuración del Lottie
const lottieOptions = {
  animationData: Kids,
  loop: true,
  autoplay: true,
};

const LottieWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;


// Animación para resaltar el botón con un borde blanco
const highlightBorder = keyframes`
  0%, 100% {
    border: 4px solid transparent;
  }
  50% {
    border: 4px solid rgba(255, 255, 255, 0.8); /* Borde blanco que aparece y desaparece */
  }
`;

// Contenedor principal que asegura que las secciones estén apiladas verticalmente
const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh; /* Ocupa todo el viewport */
  overflow-x: hidden;
`;

// Ajustamos el fondo del contenedor principal solo para la imagen
const BannerSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #0B8AD9 50%, #FF4D4D 50%);
  padding: 0;
`;

const BannerWrapper = styled.div`
  width: 100vw; /* Usamos el 100% del viewport */
  height: auto; /* Ajustamos la altura */
  margin: 0 auto;
  overflow: hidden;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${fadeIn} 1s ease-in-out 1s forwards;
  opacity: 0;

  /* Media query para cambiar la imagen en pantallas pequeñas */
  @media (max-width: 720px) {
    content: url(${Banner}); /* Cambiamos a la imagen más pequeña */
  }

  @media (min-width: 721px) {
    content: url(${BannerCompu}); /* Cambiamos a la imagen más grande */
  }
`;

// Nueva sección con información sobre la organización
const InfoSection = styled.div`
  padding: 50px;
  background-color: #f8f8f8;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  color: #333;
  width: 100%;
`;

const InfoTitle = styled.h2`
  color: #0B8AD9;
  font-size: 2.5rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const InfoText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 20px;
  }
`;

// Nueva sección para destacar logros o información relevante
const AchievementsSection = styled.div`
  padding: 50px;
  background-color: #fff;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  color: #333;
  width: 100%;
`;

const AchievementsTitle = styled.h2`
  color: #FF4D4D;
  font-size: 2.5rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const AchievementsText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 20px;
  }
`;

// Sección de contacto estilo botón circular con animación de resaltado
const ContactSection = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #25D366; /* Color verde de WhatsApp */
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;
  animation: ${highlightBorder} 5s infinite; /* Animación de borde cada 5 segundos */
  
  @media (max-width: 720px) {
    width: 60px;
    height: 60px;
  }
`;

const WhatsappIcon = styled(FaWhatsapp)`
  color: white;
  font-size: 2.5rem;

  @media (max-width: 720px) {
    font-size: 2rem;
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


const ColaborateCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 250px;
  text-align: center;
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: #0B8AD9;
  margin-bottom: 20px;
`;

const ColaborateText = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 10px;
`;

// Nueva sección de colaboración
const ColaborateSection = styled.div`
  background-color: #f0f0f0;
  padding: 50px;
  text-align: center;
  width: 100%;
`;

const ColaborateTitle = styled.h2`
  font-size: 2.5rem;
  color: #0B8AD9;
  margin-bottom: 30px;
`;

const ColaborateOptions = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 30px;
`;

/* Solo para texto especicando que somos*/
const TitleSection = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.6); /* Fondo semitransparente */
  padding: 20px 0;
`;

const TitleText = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  color: #ffffff; /* Color blanco */
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;
export const HomePrincipal = () => {
  const { View: LottieComponent } = useLottie(lottieOptions);
  
  return (
    <MainContainer>
      {/* Sección con fondo de colores y la imagen */}
      <BannerSection>
        <BannerWrapper>
          <BannerImage src={BannerCompu} alt="Banner con niños" />
        </BannerWrapper>
      </BannerSection>

      {/* Sección de título justo debajo del banner */}
      <TitleSection>
        <TitleText>Ayudando a niños con desnutrición</TitleText>
      </TitleSection>

      
      {/* Sección de información sobre la organización con Lottie */}
      <InfoSection>
        <InfoTitle>Asociación Amigos de Nueva Santa Rosa</InfoTitle>
        <LottieWrapper>{LottieComponent}</LottieWrapper> {/* Aquí se renderiza el componente de Lottie */}
        <InfoText>
          Hace 2 años estamos comprometidos a ayudar a niños con desnutrición mediante un programa anual que les proporciona víveres y chequeos médicos. Nos dedicamos a mejorar la calidad de vida de los niños más vulnerables en las comunidades de Nueva Santa Rosa, Guatemala.
        </InfoText>
      </InfoSection>


      <ColaborateSection>
        <ColaborateTitle>¿Cómo puedes colaborar?</ColaborateTitle>
        <ColaborateOptions>
          <ColaborateCard>
            <IconWrapper>
              <FaHandsHelping />
            </IconWrapper>
            <ColaborateText>Dona tu tiempo en nuestras jornadas</ColaborateText>
          </ColaborateCard>

          <ColaborateCard>
            <IconWrapper>
              <FaBoxOpen />
            </IconWrapper>
            <ColaborateText>Insumos de limpieza, oficina y agua pura</ColaborateText>
          </ColaborateCard>

          <ColaborateCard>
            <IconWrapper>
              <FaDonate />
            </IconWrapper>
            <ColaborateText>Donaciones a la cuenta monetaria 3080046231 ANSAR (Banrural)</ColaborateText>
          </ColaborateCard>

          <ColaborateCard>
            <IconWrapper>
              <FaPhone />
            </IconWrapper>
            <ColaborateText>Llámanos para más información: 41495263 / 58796968</ColaborateText>
          </ColaborateCard>
        </ColaborateOptions>
      </ColaborateSection>

      {/* Sección de información sobre la organización */}
      <InfoSection>
        <InfoTitle>Nuestra Misión</InfoTitle>
        <InfoText>
          Somos un grupo de doctores y personas de gran corazón comprometidos con el bienestar de los niños que sufren de desnutrición en la región de Nueva Santa Rosa, Guatemala. Con más de 2 años de experiencia, nos dedicamos a mejorar la calidad de vida de los niños a través de programas de atención médica y apoyo nutricional. Nuestro equipo está enfocado en brindar soluciones de salud que transformen el futuro de las comunidades con las que trabajamos.
        </InfoText>
      </InfoSection>

      {/* Sección de logros o información adicional */}
      <AchievementsSection>
        <AchievementsTitle>Nuestros Logros</AchievementsTitle>
        <AchievementsText>
          Hemos atendido a más de 100 niños en las comunidades rurales de Nueva Santa Rosa. Nuestro equipo ha trabajado arduamente para reducir los índices de desnutrición infantil y ha brindado acceso a servicios médicos de calidad a las familias más necesitadas.
        </AchievementsText>
      </AchievementsSection>

      {/* Footer */}
      <Footer>
        <FooterText>© 2024 ANSAR - Todos los derechos reservados</FooterText>
        <SocialIcons>
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
          <FaYoutube /> {/* Añadimos el ícono de YouTube */}
        </SocialIcons>
      </Footer>

      {/* Sección de contacto como un botón circular */}
      <ContactSection>
        <WhatsappIcon />
      </ContactSection>
    </MainContainer>
  );
};
