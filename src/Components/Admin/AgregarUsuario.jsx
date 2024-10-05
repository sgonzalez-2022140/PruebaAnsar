import React, { useState } from 'react';
import styled from 'styled-components';
import { useRegister } from '../../Shared/Hooks/USER/useRegister';
import { ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ImageUpload from './ImageUpload';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
`;

const FormGroup = styled.div`
  flex: 1 1 calc(50% - 20px);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
  &:after {
    content: '*';
    color: red;
    margin-left: 5px;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  background-color: #fff;
  color: #000;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  background-color: #fff;
  color: #000;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1.2em;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  font-size: 1em;
  color: ${props => (props.error ? 'red' : 'green')};
  margin-top: 10px;
  width: 100%;
  text-align: center;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  top: 35px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: black;
`;

export const  AgregarUsuario = () => {
  const { user, handleChange, handleImageChange, handleSubmit, loading, error, success } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowRetypePassword = () => {
    setShowRetypePassword(!showRetypePassword);
  };

  return (
    <FormContainer>
      <h1>Registrar Nuevo Usuario</h1>
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nombre</Label>
          <Input type="text" name="name" value={user.name} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Apellido</Label>
          <Input type="text" name="lastname" value={user.lastname} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Nombre de usuario</Label>
          <Input type="text" name="username" value={user.username} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Contraseña</Label>
          <Input type={showPassword ? "text" : "password"} name="password" value={user.password} onChange={handleChange} required />
          <TogglePasswordButton type="button" onClick={toggleShowPassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </TogglePasswordButton>
        </FormGroup>
        <FormGroup>
          <Label>Confirmar contraseña</Label>
          <Input type={showRetypePassword ? "text" : "password"} name="retypePassword" value={user.retypePassword} onChange={handleChange} required />
          <TogglePasswordButton type="button" onClick={toggleShowRetypePassword}>
            {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
          </TogglePasswordButton>
        </FormGroup>
        <FormGroup>
          <Label>Teléfono</Label>
          <Input type="text" name="phone" value={user.phone} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Área</Label>
          <Input type="text" name="area" value={user.area} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Horario</Label>
          <Select name="horario" value={user.horario} onChange={handleChange} required>
            <option value="" disabled>Selecciona un horario</option>
            <option value="Horario normal">Horario normal</option>
            <option value="Una vez por semana">Una vez por semana</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Rol</Label>
          <Select name="role" value={user.role} onChange={handleChange} required>
            <option value="" disabled>Selecciona un rol</option>
            <option value="DOCTOR">DOCTOR</option>
            <option value="TRABAJADOR">TRABAJADOR</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Imagen de Usuario</Label>
          <ImageUpload onImageChange={handleImageChange} />
        </FormGroup>
        {loading && <Message>Cargando...</Message>}
        {error && <Message error>{error}</Message>}
        {success && <Message>¡Registro exitoso!</Message>}
        <ButtonContainer>
          <Button type="submit">Registrar</Button>
        </ButtonContainer>
      </StyledForm>
      <ToastContainer />
    </FormContainer>
  );
};
