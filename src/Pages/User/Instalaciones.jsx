import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '/insta1.png';
import img2 from '/insta2.png';
import img3 from '/insta3.png';
import img4 from '/insta4.png';
import img5 from '/insta5.png';
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
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
`;

const Title = styled.h2`
  color: #0B8AD9;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const BackButton = styled.button`
  background-color: #0B8AD9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: auto;

  &:hover {
    background-color: #0675A3;
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainImageContainer = styled.div`
  width: 600px;
  height: 400px;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const CarouselContainer = styled.div`
  width: 80%;
  .slick-slide img {
    display: block;
    width: 100%;
    height: 100px;
    object-fit: contain;
    cursor: pointer;
  }
`;

export const Instalaciones = () => {
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
  };

  return (
    <GaleriaContainer>
      <Header>
        <BackButton onClick={handleBackClick}>
          <FaArrowLeft style={{ marginRight: '10px' }} />
        </BackButton>
        <Title>Álbum De Instalaciones</Title>
      </Header>
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
