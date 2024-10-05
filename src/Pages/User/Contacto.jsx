import React, { useRef } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';

// Importa la imagen de fondo
import BackgroundImage from '../../assets/SantaRosa1.jpg';

// Estilo para el contenedor principal que incluye la imagen de fondo
const BackgroundWrapper = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover; /* Asegura que la imagen de fondo cubra todo el espacio disponible */
  background-position: center;
  min-height: calc(100vh - 70px); /* Ajusta la altura restando el tamaño del navbar */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw; /* Asegura que cubra todo el ancho de la pantalla */
`;

// Estilo para el formulario, lo centra y le da estilo
const FormCard = styled.div`
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco con opacidad */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  z-index: 1; /* Asegura que el formulario esté sobre el fondo */
`;

const FormTitle = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const Contacto = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_9fqlx3a', 'template_dcktlof', form.current, 'd9MVdTaZIoPI9nN2M')
      .then(
        () => {
          toast.success('Enviado correctamente'); // Muestra el mensaje de éxito
          form.current.reset(); // Resetea el formulario después de enviar el correo
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <BackgroundWrapper>
      <FormCard>
        <FormTitle>CONTACTANOS</FormTitle>
        <form ref={form} onSubmit={sendEmail}>
          <div className="mb-3">
            <label htmlFor="user_name" className="form-label">Nombre</label>
            <input type="text" name="user_name" id="user_name" className="form-control form-control-lg" required />
          </div>
          <div className="mb-3">
            <label htmlFor="user_email" className="form-label">Email</label>
            <input type="email" name="user_email" id="user_email" className="form-control form-control-lg" required />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Mensaje</label>
            <textarea name="message" id="message" className="form-control form-control-lg" rows="5" required></textarea>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-warning btn-lg">Enviar mensaje</button>
          </div>
        </form>
      </FormCard>
    </BackgroundWrapper>
  );
};
