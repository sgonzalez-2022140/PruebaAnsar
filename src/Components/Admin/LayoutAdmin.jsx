import React from 'react'
import styled from 'styled-components';
import { NabarAdmin } from './NabarAdmin';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;  
  height: 100vh;
  margin: 0;
`;

const Content = styled.div`
  flex-grow: 1;
  
  background-color: #f0f0f0;
  overflow-y: auto;  
`;

const LayoutAdmin = ( {children}) => {
  return (
    <MainContainer>
      <NabarAdmin />
      <Content>
        {children}
      </Content>
    </MainContainer>
  );
}

export default LayoutAdmin
