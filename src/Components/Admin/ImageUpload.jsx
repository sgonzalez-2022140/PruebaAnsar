import React, { useState } from 'react';
import styled from 'styled-components';

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadButton = styled.label`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  margin-top: 10px;
  max-width: 100%;
  border-radius: 5px;
`;

const ImageUpload = ({ onImageChange }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        onImageChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ImageUploadContainer>
      <UploadButton htmlFor="imageUpload">Seleccionar archivo</UploadButton>
      <HiddenInput
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {imagePreview && <ImagePreview src={imagePreview} alt="Vista previa de la imagen" />}
    </ImageUploadContainer>
  );
};

export default ImageUpload;