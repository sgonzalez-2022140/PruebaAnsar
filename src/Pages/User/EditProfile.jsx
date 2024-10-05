import { useState} from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import styled from 'styled-components';
// Importaciones de funcionalidades
import { useUserDetails } from '../../Shared/Hooks/useUserDetails';
//Importar el editar perfil


const StyledContainer = styled(Container)`
  padding: 2rem;
`;

const ProfileSidebar = styled(Col)`
  border-right: 1px solid #dee2e6;
`;

const ProfileHeader = styled.div`
  padding: 1rem 0;
  text-align: center;
  border-bottom: 1px solid #dee2e6;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
`;

const ProfileName = styled.h4`
  margin: 0;
`;

const ProfileEmail = styled.p`
  color: #6c757d;
  margin: 0;
`;

const SidebarMenu = styled(ListGroup)`
  margin-top: 1rem;
`;

const SidebarMenuItem = styled(ListGroupItem)`
  border: none;
  padding: 1rem 1.5rem;
  &:hover {
    background-color: #a4b2c0;
    cursor: pointer;
  }
`;

const ContentArea = styled(Col)`
  padding: 2rem;
`;

const NoOrdersMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
`;

const EditProfileContent = () => (
  <div>
    <h3>Editar Perfil</h3>
    <NoOrdersMessage>      
      
      
    </NoOrdersMessage>
  </div>
);

const NotificationsContent = () => (
  <div>
    <h3>Notificaciones</h3>
    <NoOrdersMessage>      
      <h5>Aqui puedes ver tus Notificaciones</h5>
      <p>Hola</p>
      
    </NoOrdersMessage>
  </div>
);

const OrdersContent = () => (
  <div>
    <h3>Historial</h3>
    <NoOrdersMessage>      
      <h5>No tienes movimientos</h5>
      <p>Empieza buscando entre los miles de productos que tenemos disponibles.</p>
      
    </NoOrdersMessage>
  </div>
);

const ProductContent = () => (
  <div>
    <h3>Productos comprados</h3>
    <NoOrdersMessage>      
      <h5>Aqui mostrar tipo registros en una tabla</h5>
      <p>Empieza buscando entre los miles de productos que tenemos disponibles.</p>
      
    </NoOrdersMessage>
  </div>
);

const ContactsContent = () => (
  <div>
    <h3>Contactos favoritos</h3>
    <NoOrdersMessage>      
      <h5>Ver contactos favoritos</h5>
      <p>En forma de lista con su alias e información</p>
      
    </NoOrdersMessage>
  </div>
);

const SupportContent = () => (
  <div>
    <h3>Soporte</h3>
    <p>Aquí puedes obtener soporte.</p>
  </div>
);

export const EditProfile = () => {
  const [activeTab, setActiveTab] = useState('Pedidos');
  const { logoutSys, name, username } = useUserDetails(); 

  

  const handleLogout = () => {
    logoutSys();
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Historial':
        return <OrdersContent />;
      case 'Perfil y contraseña':
        return <EditProfileContent />;
      case 'Notificaciones':
        return <NotificationsContent />;
      case 'Productos comprados':
        return <ProductContent />;
      case 'Contactos favoritos':
        return <ContactsContent />;
      case 'Soporte':
        return <SupportContent />;
      default:
        return <OrdersContent />;
    }
  };

  return (
    <StyledContainer fluid>
      <Row>
        <ProfileSidebar md={3}>
          <ProfileHeader>
            <ProfileImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s" alt="Profile" />
            <ProfileName>Hola, {name}</ProfileName>
            <ProfileEmail>{username}</ProfileEmail>
          </ProfileHeader>
          <SidebarMenu>
            <SidebarMenuItem active={activeTab === 'Historial'} onClick={() => setActiveTab('Historial')}>Historial</SidebarMenuItem>
            <SidebarMenuItem active={activeTab === 'Perfil y contraseña'} onClick={() => setActiveTab('Perfil y contraseña')}>Perfil y contraseña</SidebarMenuItem>
            <SidebarMenuItem active={activeTab === 'Notificaciones'} onClick={() => setActiveTab('Notificaciones')}>Notificaciones</SidebarMenuItem>
            <SidebarMenuItem active={activeTab === 'Productos comprados'} onClick={() => setActiveTab('Productos comprados')}>Productos comprados</SidebarMenuItem>
            <SidebarMenuItem active={activeTab === 'Contactos favoritos'} onClick={() => setActiveTab('Contactos favoritos')}>Contactos favoritos</SidebarMenuItem>
            <SidebarMenuItem active={activeTab === 'Soporte'} onClick={() => setActiveTab('Soporte')}>Soporte</SidebarMenuItem>
            <SidebarMenuItem onClick={handleLogout} className="text-danger">Cerrar sesión</SidebarMenuItem>
          </SidebarMenu>
        </ProfileSidebar>
        <ContentArea md={9}>
          {renderContent()}
        </ContentArea>
      </Row>
    </StyledContainer>
  );
};