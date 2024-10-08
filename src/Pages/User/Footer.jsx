import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const FooterContainer = styled.footer`
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

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 ANSAR - Todos los derechos reservados</FooterText>
      <SocialIcons>
        <FaFacebook />
        <FaInstagram />
        <FaTwitter />
        <FaYoutube />
      </SocialIcons>
    </FooterContainer>
  );
};

