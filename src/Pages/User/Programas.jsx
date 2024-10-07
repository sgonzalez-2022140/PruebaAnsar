import React from 'react';
import styled from 'styled-components';
import { FaUserMd, FaBoxOpen } from 'react-icons/fa'; // Iconos de jornadas y víveres

const ProgramContainer = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const ProgramTitle = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #003366;
  text-align: center;
`;

const ProgramDescription = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 30px;
  text-align: center;
`;

const ProgramList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ProgramItem = styled.div`
  background-color: #f4f4f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    background-color: #e2e2f1;
  }
`;

const IconWrapper = styled.div`
  font-size: 3em;
  color: #005580;
  margin-bottom: 10px;
  text-align: center;
`;

const ProgramItemTitle = styled.h2`
  font-size: 1.8em;
  color: #005580;
  margin-bottom: 10px;
  text-align: center;
`;

const ProgramItemDescription = styled.p`
  font-size: 1.1em;
  line-height: 1.5;
  text-align: justify;
`;

export const Programas = () => {
  return (
    <ProgramContainer>
      <ProgramTitle>Programas Anuales</ProgramTitle>

      <ProgramDescription>
        Nuestros programas están diseñados para brindar apoyo integral a las familias y niños que enfrentan situaciones de desnutrición. Cada año organizamos jornadas médicas especializadas y la entrega de víveres para garantizar el bienestar de los más vulnerables. A continuación, te presentamos nuestros programas principales:
      </ProgramDescription>

      <ProgramList>
        <ProgramItem>
          <IconWrapper>
            <FaUserMd />
          </IconWrapper>
          <ProgramItemTitle>Jornada Médica Anual</ProgramItemTitle>
          <ProgramItemDescription>
            Todos los años organizamos una jornada médica especializada en atención infantil para niños de 0 a 5 años. En la jornada, colaboran médicos especializados en nutrición y pediatría, quienes ayudan a prevenir la desnutrición y ofrecen a los niños un seguimiento médico adecuado. Estas jornadas tienen como objetivo principal brindar atención a niños de áreas rurales y asegurar que reciban el tratamiento necesario para su bienestar.
          </ProgramItemDescription>
        </ProgramItem>

        <ProgramItem>
          <IconWrapper>
            <FaBoxOpen />
          </IconWrapper>
          <ProgramItemTitle>Entrega de Víveres</ProgramItemTitle>
          <ProgramItemDescription>
            Además de la atención médica, entregamos víveres y suplementos nutricionales a las familias más necesitadas de las aldeas cercanas. Nuestro objetivo es mejorar la nutrición infantil y ofrecerles un futuro mejor. Estos víveres incluyen alimentos ricos en nutrientes que son esenciales para el desarrollo saludable de los niños y la estabilidad alimentaria de sus familias.
          </ProgramItemDescription>
        </ProgramItem>
      </ProgramList>
    </ProgramContainer>
  );
};
