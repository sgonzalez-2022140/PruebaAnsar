import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '/act1.png';
import img2 from '/act2.png';
import img3 from '/act3.png';
import img4 from '/act4.png';
import img5 from '/act5.png';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const images = [img1, img2, img3, img4, img5];

const GaleriaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  overflow-x: hidden; /* Evita el desbordamiento en el eje X */
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  margin-top: 40px; 

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const BackButtonContainer = styled.div`
  position: absolute;
  top: -20px; /* Ajusta la posición para subir el botón */
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;

  @media (min-width: 720px) {
    top: -20px;
    left: 0;
    justify-content: flex-start; /* Alínea el botón a la izquierda en pantallas grandes */
  }
`;

const BackButton = styled.button`
  background-color: #0B8AD9;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 10px;  /* Botón rectangular por defecto */
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #0675A3;
  }

  /* Media query para pantallas grandes (mayores a 720px) */
  @media (min-width: 720px) {
    border-radius: 50%;  /* Botón circular */
    width: 50px;
    height: 50px;
    font-size: 18px;
    
    span {
      display: none; /* Oculta el texto en pantallas grandes */
    }
  }

  span {
    margin-left: 10px; /* Margen solo para el texto */
  }
`;

const Title = styled.h2`
  color: #0B8AD9;
  font-size: 2em;
  text-align: center;
  margin: 0 auto;
  padding-top: 20px;

  @media (max-width: 720px) {
    padding-top: 40px; /* Baja el título en pantallas menores a 720px */
  }
`;

const Description = styled.p`
  font-size: 1.2em;
  color: #666;
  margin-top: 10px;
  text-align: center;
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: 1em;
    padding: 0 10px;
  }
`;

const MainImageContainer = styled.div`
  width: 600px;
  height: 400px;
  margin: 40px 0 20px; 
  
  @media (max-width: 768px) {
    width: 90%;
    height: auto;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;

    @media (max-width: 768px) {
      height: auto;
    }
  }
`;

const CarouselContainer = styled.div`
  width: 80%;
  background-color: #E5E5E5;  /* Fondo del slider */
  padding: 20px;
  border-radius: 15px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }

  .slick-slide img {
    display: block;
    width: 100%;
    height: 100px;
    object-fit: contain;
    cursor: pointer;

    @media (max-width: 768px) {
      height: 70px;
    }
  }
`;

export const Actividades = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const navigate = useNavigate();

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleBeforeChange = (oldIndex, newIndex) => {
    setSelectedImage(images[newIndex]);
  };

  const handleBackClick = () => {
    navigate(-1); 
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
    beforeChange: handleBeforeChange,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <GaleriaContainer>
      <Header>
        <BackButtonContainer>
          <BackButton onClick={handleBackClick}>
            <FaArrowLeft />
            <span>Regresar a la galería</span>
          </BackButton>
        </BackButtonContainer>
        <Title>Álbum De Actividades</Title>
      </Header>
      
      <Description>
        En esta sección puedes explorar las imágenes de las actividades realizadas con nuestros participantes. 
        Aquí, nos enfocamos en alimentar a los niños, pesarlos y brindarles víveres esenciales para asegurar su bienestar y salud.
      </Description>
      
      <MainImageContainer>
        <img src={selectedImage} alt="Selected" />
      </MainImageContainer>
      
      <CarouselContainer>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} onClick={() => handleImageClick(image)}>
              <img src={image} alt={`Imagen ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </CarouselContainer>
    </GaleriaContainer>
  );
};
