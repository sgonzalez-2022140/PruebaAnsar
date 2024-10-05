import React from 'react';
import styled from 'styled-components';
import { NavbarMain } from './NavbarMain';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;  
  min-height: 100vh; 
  margin: 0;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f0f0f0;
  overflow-y: auto;
  box-sizing: border-box;
  padding-top: 0;
`;

const LayoutMain = ({ children }) => {
  return (
    <MainContainer>
      <NavbarMain />
      <Content>
        {children}
      </Content>
    </MainContainer>
  );
};

export default LayoutMain;