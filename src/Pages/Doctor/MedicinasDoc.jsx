import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetMedicine } from '../../Shared/Hooks/MEDICINE/useGetMedicine';
import { GiMedicines } from "react-icons/gi";
import { HashLoader } from 'react-spinners';

// --------- Estilos
const MedicineBanner = styled.div`
    display: flex; 
    align-items: center; 
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    position: relative;
`;

const MedicineIcon = styled.div`
    margin-right: 15px;
    color: #0B8AD9;
`;

const BannerTitle = styled.div`
    width: 100%;
    margin: 0;
    font-size: 32px;
    font-weight: bold;
    display: flex;
    justify-content: center;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MedicinesContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const MedicineCard = styled.div`
  position: relative;
  border: 3px solid #0B8AD9;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  width: 300px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MedicineCardTitle = styled.h2`
  margin-top: 0;
  font-weight: bold;
`;

const Label = styled.span`
  font-weight: bold;
`;

const MedicineImage = styled.img`
  width: 100%;
  height: 200px; 
  object-fit: cover;
`;

const RadioButtons = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const RadioButton = styled.div`
  background-color: #ccc;
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;

  ${({ checked }) => checked && `
    background-color: #007bff;
    color: white;
  `}
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  color: #000;
  transition: border-bottom 0.2s ease-in-out;
  &:focus {
    outline: none;
    border-bottom: 2px solid #0B8AD9;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8); 
  z-index: 999; 
`;

const NoMedicineMessage = styled.p`
  text-align: center;
  width: 100%;
`;

const formatDate = (date) => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset()); // Suma la diferencia de horarios para que no se desfase la hora
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export const MedicinasDoc = () => {
  const { medicine, isFetching, getMedicine } = useGetMedicine();
  const [query, setQuery] = useState('');
  const [filteredMedicine, setFilteredMedicine] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    getMedicine();
  }, [getMedicine]);

  useEffect(() => {
    if (medicine) {
      setFilteredMedicine(
        medicine.filter(med =>
          Object.values(med).some(value =>
            value.toString().toLowerCase().includes(query.toLowerCase())
          )
        )
      );
    }
  }, [query, medicine]);

  const paginatedMedicine = filteredMedicine ? filteredMedicine.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage) : [];
  const totalPages = filteredMedicine ? Math.ceil(filteredMedicine.length / itemsPerPage) : 0;

  const handlePageChange = (index) => {
    setPageIndex(index);
  };

  return (
    <PageContainer>
      <MedicinesContainer>
        <MedicineBanner>
          <MedicineIcon>
            <GiMedicines size={50}/>
          </MedicineIcon>
          <BannerTitle>Medicinas</BannerTitle>
        </MedicineBanner>
        <SearchBar
          type="text"
          placeholder="Barra de búsqueda"
          onChange={e => setQuery(e.target.value)}
        />
        {isFetching ? (
          <LoaderContainer>
            <HashLoader color="#0b8ad9" loading={true} size={50} />
          </LoaderContainer>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {paginatedMedicine && paginatedMedicine.length > 0 ? (
              paginatedMedicine.map(med => (
                <MedicineCard key={med._id}>
                  <MedicineImage
                    src={`http://localhost:2659/medicine/getImg/${med._id}?timestamp=${Date.now()}`}
                    crossOrigin="anonymous"
                    alt="Medicine"
                  />
                  <MedicineCardTitle>{med.nombre}</MedicineCardTitle>
                  <p><Label>Unidades:</Label> {med.unidades}</p>
                  <p><Label>Vencimiento:</Label> {formatDate(med.vencimiento)}</p>
                  <p><Label>Precio Unitario:</Label> {med.precio_unitario}</p>
                  <p><Label>Proveedor:</Label> {med.proveedor}</p>
                  <p><Label>Tipo de Medicina:</Label> {med.tipo_medicina}</p>
                </MedicineCard>
              ))
            ) : (
              <NoMedicineMessage>No hay medicinas disponibles.</NoMedicineMessage>
            )}
          </div>
        )}
      </MedicinesContainer>

      <RadioButtons>
        {Array.from({ length: totalPages }, (_, index) => (
          <RadioButton
            key={index}
            onClick={() => handlePageChange(index)}
            checked={pageIndex === index}
          >
            {index + 1}
          </RadioButton>
        ))}
      </RadioButtons>
    </PageContainer>
  );
};
