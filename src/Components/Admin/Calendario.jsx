import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPlus } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #2c3e50;
  border-radius: 10px;
  color: white;
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #34495e;
  padding: 20px;
  border-radius: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  color: white;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  background-color: #ecf0f1;
  color: #2c3e50;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  background-color: #ecf0f1;
  color: #2c3e50;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1em;
  cursor: pointer;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #0056b3;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  background-color: #ecf0f1;
  color: #2c3e50;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CurrentDate = styled.div`
  font-size: 2em;
  font-weight: bold;
`;

const CurrentEvents = styled.div`
  background-color: #16a085;
  padding: 10px;
  border-radius: 5px;
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
`;

const EventItem = styled.li`
  margin-bottom: 10px;
`;

const GlobalStyle = createGlobalStyle`
  .custom-datepicker {
    background-color: #ecf0f1;
    color: #2c3e50;
    border-radius: 10px;
    padding: 10px;
  }

  .custom-datepicker .react-datepicker__header {
    background-color: #2c3e50;
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .custom-datepicker .react-datepicker__day-name,
  .custom-datepicker .react-datepicker__day,
  .custom-datepicker .react-datepicker__time-name {
    color: #2c3e50;
  }

  .custom-datepicker .react-datepicker__day--selected,
  .custom-datepicker .react-datepicker__day--keyboard-selected {
    background-color: #007bff;
    color: white;
  }
`;

export const Calendario = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <GlobalStyle />
      <Container>
        <FormContainer>
          <h2>Crear Evento</h2>
          <Form>
            <div>
              <Label>Nombre del Evento:</Label>
              <Input type="text" name="nombre" required />
            </div>
            <div>
              <Label>Descripción:</Label>
              <Textarea name="descripcion" rows="4" required />
            </div>
            <div>
              <Label>Horario:</Label>
              <Select name="horario" required>
                <option value="" disabled>Selecciona un horario</option>
                <option value="normal">Horario normal</option>
                <option value="semanal">Una vez por semana</option>
              </Select>
            </div>
            <div>
              <Label>Fecha del Evento:</Label>
              <DatePicker 
                selected={startDate} 
                onChange={date => setStartDate(date)} 
                customInput={<Input />}
                calendarClassName="custom-datepicker"
              />
            </div>
            <Button type="submit">Crear Evento</Button>
          </Form>
        </FormContainer>
        <CalendarContainer>
          <CalendarHeader>
            <CurrentDate>{startDate.toLocaleDateString()}</CurrentDate>
            <FaPlus />
          </CalendarHeader>
          <CurrentEvents>
            <h3>Eventos del día</h3>
            <EventList>
              <EventItem>Evento 1</EventItem>
              <EventItem>Evento 2</EventItem>
            </EventList>
          </CurrentEvents>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            inline
            calendarClassName="custom-datepicker"
          />
        </CalendarContainer>
      </Container>
    </>
  );
};
