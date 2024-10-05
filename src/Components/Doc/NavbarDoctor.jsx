import React, { useState } from 'react';
import Logo from '../../assets/Logo.png';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useMyPerfil } from '../../Shared/Hooks/USER/useMyPerfil';
import defaultUser from '/defaultUser.png'; 

const NavbarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fffaf2;
  padding: 40px 20px;
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
  height: 80px;
  margin-right: 10px;
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    position: fixed;
    top: 55px;
    left: 0;
    background-color: #0B8AD9;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(124, 118, 118, 0.2);
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
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  padding: 10px;
  transition: background-color 0.3s, color 0.3s;

  @media (max-width: 768px) {
    color: white;
    width: 100%;
    text-align: center;
  }

  &:hover {
    background-color: #f0f0f0;
    color: #1a73e8;
    @media (max-width: 768px) {
      background-color: #1a73e8;
      color: #fff;
    }
  }
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: ${props => (props.open ? 'block' : 'none')};
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const NavbarDoctor = () => {
  const [open, setOpen] = useState(false);
  const { user, loading, error } = useMyPerfil();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  const profileImageUrl = user && user._id 
    ? `http://localhost:2659/user/getImg/${user._id}?timestamp=${Date.now()}`
    : defaultUser; 

  return (
    <NavbarStyled>
      <NavLink to="/home-doctor" onClick={() => setOpen(false)} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
        <LogoImage src={Logo} alt="Logo" />
        <div>ANSAR</div>
      </NavLink>
      <MenuIcon onClick={() => setOpen(!open)}>☰</MenuIcon>
      <LinksContainer open={open}>
        <StyledNavLink to="/pacientes" onClick={() => setOpen(false)}>Pacientes</StyledNavLink>
        <StyledNavLink to="/eventos" onClick={() => setOpen(false)}>Eventos</StyledNavLink>
        <StyledNavLink to="/medicinas" onClick={() => setOpen(false)}>Medicinas</StyledNavLink>
        <StyledNavLink to="/consultas" onClick={() => setOpen(false)}>Consultas</StyledNavLink>        
      </LinksContainer>
      <ProfileContainer>
        <NavLink to="/editar-perfil-doctor" onClick={() => setOpen(false)}>
          <ProfileImage src={profileImageUrl} crossOrigin="anonymous" alt="Profile" onError={(e) => { e.target.onerror = null; e.target.src = defaultUser; }} />
        </NavLink>
      </ProfileContainer>
    </NavbarStyled>
  );
};
