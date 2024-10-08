import React, { useState } from 'react';
import Logo from '../../assets/Logo.png';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavbarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00264d; /* Azul oscuro */
  padding: 10px 20px;
  width: 100%;
  height: 6.5%;
  top: 0;
  z-index: 1000;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 50px;
  margin-right: 10px;
`;

const LogoText = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  padding-top: 0.5rem;
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    position: fixed;
    top: 65px; 
    left: 0;
    background-color: #1769bb; 
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: ${props => props.open ? 'flex' : 'none'};
    height: calc(100vh - 55px); 
    align-items: center; 
    color: white;
  }
`;

const MenuIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    font-size: 24px;
    cursor: pointer;
    color: white;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  padding: 10px;
  transition: background-color 0.3s, color 0.3s;

  &.active {
    background-color: #00509e; /* Azul más claro en hover */
    color: white;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    color: white;
    width: 100%;
    text-align: center;

    &:hover {
      background-color: #00509e;
    }
  }
`;

export const NavbarMain = () => {
  const [open, setOpen] = useState(false);

  return (
    <NavbarStyled>
      <NavLink to="/" onClick={() => setOpen(false)} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
        <LogoImage src={Logo} alt="Logo" />
        <LogoText>ANSAR</LogoText>
      </NavLink>
      <MenuIcon onClick={() => setOpen(!open)}>☰</MenuIcon>
      <LinksContainer open={open}>
        <StyledNavLink exact to="/historia" onClick={() => setOpen(false)}>¿Quiénes somos?</StyledNavLink>
        <StyledNavLink to="/programa" onClick={() => setOpen(false)}>Programas</StyledNavLink>
        <StyledNavLink to="/contacto" onClick={() => setOpen(false)}>Contacto</StyledNavLink>
        <StyledNavLink to="/galeria" onClick={() => setOpen(false)}>Galería</StyledNavLink>
      </LinksContainer>
    </NavbarStyled>
  );
};

export default NavbarMain;
