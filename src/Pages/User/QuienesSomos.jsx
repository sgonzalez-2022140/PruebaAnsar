import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Reemplazado useHistory por useNavigate
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Banrural from '../../assets/Banru.png'; // Imagen del banco
import doctor from '../../assets/DOC.jpg';
import Banner from '../../../public/act1.png'; // Imagen del banner

// Contenedor principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #333;
  width: 100%;
  margin: 0;
  padding: 0;
`;

// Sección de cabecera con la imagen de fondo y sombreado
const Header = styled.div`
  background: url(${Banner}) no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 50vh;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6); // Agrega un sombreado oscuro para resaltar el texto
    z-index: 1;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

// Título principal en la imagen de fondo
const Title = styled.h1`
  font-size: 3em;
  color: #ffffff;
  z-index: 2;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.5); // Fondo oscuro semitransparente para mejor legibilidad
  padding: 10px 20px;
  border-radius: 10px;
  margin: 0;
`;

// Subtítulo o llamada a la acción
const Subtitle = styled.h2`
  font-size: 1.8em;
  color: #ffffff;
  z-index: 2;
  margin-top: 20px;
`;

// Botón de llamada a la acción
const ActionButton = styled(Button)`
  background-color: #fcd12a;
  color: #333;
  padding: 10px 20px;
  font-size: 1.2em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 2;
  margin-top: 20px;

  &:hover {
    background-color: #e5b320;
  }
`;

// Contenedor del contenido "Sobre Nosotros"
const AboutSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 50px 0;
  width: 90%;
  text-align: left;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

// Estilos para el texto descriptivo
const AboutText = styled.div`
  flex: 1;
  padding: 20px;
  font-size: 1.2em;
  line-height: 1.6;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 10px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

// Estilo para la imagen del fundador
const FounderImage = styled.img`
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  height: auto;
`;

// Centrado del contenido del modal
const ModalBodyStyled = styled(Modal.Body)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

// Sección de íconos y redirección
const ContactSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 50px 0;
  width: 90%;
  text-align: center;
  padding: 20px;
  background-color: #f0f4f7; // Cambiar color de fondo
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
`;

const ContactCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
  width: 280px;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 768px) {
    width: 100%; // Se muestra uno por uno en pantallas pequeñas
  }
`;

const IconWrapper = styled.div`
  font-size: 3em;
  color: #333;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
`;

const CardDescription = styled.p`
  font-size: 1.1em;
  color: #555;
  text-align: center;
`;

// Modal para información de donación
const DonationModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Información de Donación</Modal.Title>
      </Modal.Header>
      <ModalBodyStyled>
        <img src={Banrural} alt="Banrural" style={{ width: '150px', marginBottom: '20px' }} /> {/* Imagen del banco */}
        <p><strong>Banco:</strong> Banrural</p>
        <p><strong>Número de cuenta:</strong> 3080046231</p>
        <p><strong>Cuenta:</strong> Monetaria</p>
        <p><strong>Usuario:</strong> ANSAR</p>
      </ModalBodyStyled>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const QuienesSomos = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate(); // useNavigate en lugar de useHistory

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const goToContact = () => {
    navigate('/contacto'); // Usar navigate para redirigir
  };

  return (
    <Container>
      {/* Header con imagen de fondo */}
      <Header>
        <Title>Apoyando a los Niños</Title>
        <Subtitle>Con tu ayuda, podemos marcar la diferencia</Subtitle>
        <ActionButton onClick={handleShow}>Contribuir ahora</ActionButton> {/* Botón que abre el modal */}
      </Header>

      {/* Modal de información de donación */}
      <DonationModal show={show} handleClose={handleClose} />

      {/* Sección "Sobre Nosotros" */}
      <AboutSection>
        <FounderImage src={doctor} alt="Dr. Carlos Herrera" />
        <AboutText>
          <h2>SOBRE NOSOTROS</h2>
          <p><strong>Dr. Carlos Herrera - Fundador y Director</strong></p>
          <p>
          Somos una asociación dedicada a <strong>mejorar la vida de los niños</strong> a través de un programa
          de ayuda. Nuestro equipo está comprometido con el bienestar de cada
          niño que forma parte de las comunidades con las que trabajamos.
          </p>
          <p>
            Agradecemos a todos nuestros colaboradores y voluntarios que han sido parte esencial de esta misión. Su ayuda nos permite continuar brindando servicios de alimentación, educación y asistencia médica.
          </p>
          <p>
            Estamos profundamente comprometidos con el bienestar de las familias y niños de Nueva Santa Rosa, y seguiremos trabajando para cambiar el futuro de nuestra comunidad.
          </p>
        </AboutText>
      </AboutSection>

      {/* Sección de contacto */}
      <ContactSection>
        <ContactCard onClick={goToContact}>
          <IconWrapper>
            <FaPhoneAlt />
          </IconWrapper>
          <CardTitle>Contáctanos</CardTitle>
          <CardDescription>Contáctanos por correo para cualquier consulta o información.</CardDescription>
        </ContactCard>

        <ContactCard onClick={goToContact}>
          <IconWrapper>
            <FaEnvelope />
          </IconWrapper>
          <CardTitle>Envíanos un Correo</CardTitle>
          <CardDescription>Si tienes alguna duda o sugerencia, estaremos encantados de atenderte.</CardDescription>
        </ContactCard>

        <ContactCard onClick={goToContact}>
          <IconWrapper>
            <FaMapMarkerAlt />
          </IconWrapper>
          <CardTitle>Visítanos</CardTitle>
          <CardDescription>Acércate a nuestra clinica para más información sobre cómo colaborar.</CardDescription>
        </ContactCard>
      </ContactSection>
    </Container>
  );
};
