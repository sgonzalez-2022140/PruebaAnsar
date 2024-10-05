import React, { useState } from "react";
import { useLogin } from "../../Shared/Hooks/useLogin";
import { NabarAdmin } from "../Admin/NabarAdmin";
import styled, { keyframes } from "styled-components";

export const Login = () => {
  const { login, isLoading, error } = useLogin();
  const [formData, setFormData] = useState({
    account: {
      value: '',
      isValid: false,
      showError: false
    },
    password: {
      value: '',
      isValid: false,
      showError: false
    }
  });

  const isSubmitButtonDisable = !formData.account.isValid || !formData.password.isValid;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formData.account.isValid && formData.password.isValid) {
      await login(formData.account.value, formData.password.value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        account: {
          ...prevData.account,
          showError: !prevData.account.isValid
        },
        password: {
          ...prevData.password,
          showError: !prevData.password.isValid
        }
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const isValid = value.trim() !== '';
      return {
        ...prevData,
        [name]: {
          ...prevData[name],
          value,
          isValid,
          showError: !isValid
        }
      };
    });
  };

  return (
    <Container>
      <BackgroundAnimation>
        <Circle />
        <Square />
        <Triangle />
        <Circle2 />
        <Square2 />
        <Triangle2 />
        <Rectangle />
        <Ellipse />
      </BackgroundAnimation>
      <FormWrapper>
        <Title>Inicia sesión</Title>
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label htmlFor="account">Cuenta</Label>
            <Input
              type="text"
              name="account"
              id="account"
              className={formData.account.showError ? 'is-invalid' : ''}
              placeholder="Ingresa tu cuenta"
              onChange={handleChange}
              value={formData.account.value}
            />
            {formData.account.showError && <div className="invalid-feedback">Cuenta requerida</div>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              type="password"
              name="password"
              id="password"
              className={formData.password.showError ? 'is-invalid' : ''}
              placeholder="Ingresa tu contraseña"
              onChange={handleChange}
              value={formData.password.value}
            />
            {formData.password.showError && <div className="invalid-feedback">Contraseña requerida</div>}
          </FormGroup>
          <Button disabled={isSubmitButtonDisable}>Ingresar</Button>
          {isLoading && <Message>Loading...</Message>}
          {error && <Message error>{error}</Message>}
        </Form>
      </FormWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  padding: 20px;
`;

const FormWrapper = styled.div`
  background: #f9f9f9;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 100%;
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333333;
`;

const Form = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #666666;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #dddddd;
  background: #ffffff;
  color: #333333;
  &:focus {
    outline: none;
    border-color: #aaaaaa;
  }
  &.is-invalid {
    border-color: red;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #007bff;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background: #0056b3;
  }
  &:disabled {
    background: #dddddd;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  color: ${(props) => (props.error ? 'red' : 'green')};
  text-align: center;
  margin-top: 20px;
`;

const moveX = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(50px);
  }
  100% {
    transform: translateX(0);
  }
`;

const moveY = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(50px);
  }
  100% {
    transform: translateY(0);
  }
`;

const BackgroundAnimation = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  background-color: rgba(0, 123, 255, 0.2);
  border-radius: 50%;
  position: absolute;
  top: 5%;
  left: 10%;
  animation: ${moveX} 6s infinite, ${moveY} 8s infinite;
  @media (max-width: 720px) {
    display: none;
  }
`;

const Square = styled.div`
  width: 150px;
  height: 150px;
  background-color: rgba(40, 167, 69, 0.2);
  position: absolute;
  bottom: 10%;
  right: 5%;
  animation: ${moveX} 5s infinite, ${moveY} 7s infinite;
  @media (max-width: 720px) {
    display: none;
  }
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 75px solid transparent;
  border-right: 75px solid transparent;
  border-bottom: 150px solid rgba(255, 193, 7, 0.2);
  position: absolute;
  top: 10%;
  right: 20%;
  animation: ${moveX} 4s infinite, ${moveY} 6s infinite;
`;

const Circle2 = styled(Circle)`
  width: 100px;
  height: 100px;
  top: 60%;
  left: 60%;
  animation-duration: 7s, 9s;
`;

const Square2 = styled(Square)`
  width: 100px;
  height: 100px;
  bottom: 50%;
  right: 70%;
  animation-duration: 6s, 8s;
`;

const Triangle2 = styled(Triangle)`
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid rgba(255, 87, 34, 0.2);
  top: 80%;
  left: 50%;
  animation-duration: 8s, 10s;
`;

const Rectangle = styled.div`
  width: 250px;
  height: 100px;
  background-color: rgba(123, 31, 162, 0.2);
  position: absolute;
  top: 5%;
  left: 50%;
  animation: ${moveX} 6s infinite, ${moveY} 8s infinite;
  @media (max-width: 720px) {
    top: 0%;
    left: 10%;
  }
`;

const Ellipse = styled.div`
  width: 200px;
  height: 100px;
  background-color: rgba(0, 188, 212, 0.2);
  border-radius: 50%;
  position: absolute;
  bottom: 5%;
  right: 15%;
  animation: ${moveX} 5s infinite, ${moveY} 7s infinite;
  @media (max-width: 720px) {
    bottom: 5%;
    right: 75%;
  }
`;