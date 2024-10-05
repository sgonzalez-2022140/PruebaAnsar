import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useUpdateMedicine } from "../../Shared/Hooks/MEDICINE/useUpdateMedicine";
import { useGetReservations } from "../../Shared/Hooks/Saldo/useGetReservations";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 10px 0 10px rgba(0, 0, 0, 0.5); /* sombra más pronunciada a la derecha */
  border-bottom: 3px solid #0b8ad9;
  border-right: 3px solid #0b8ad9;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

//para desahabilitar la parte de reserva
const DisabledFormSelect = styled(FormSelect)`
    background-color: #f0f0f0;
    color: #999;
    pointer-events: none;
    opacity: 0.6;
`;

const FormDate = styled.div`
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: black;
  font-weight: bold;
`;

const FormInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 400px;
  transition: border-bottom 0.2s ease-in-out;
  &:focus {
    outline: none;
    border-bottom: 2px solid #0cc8f2;
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const FormInputDate = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: white;
  color: black;
  text-align: center;
  outline: none;
  transition: border-bottom 0.2s ease-in-out;
  &:focus {
    outline: none;
    border-bottom: 2px solid #0cc8f2;
  }
  border: 1px solid ${({ invalid }) => (invalid ? "red" : "white")};
`;



const FormButton = styled.button`
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #0B8AD9;
    color: white;
    cursor: pointer;
    margin-top: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;

const BackButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
  margin-top: 10px;
`;

const formatDate = (date) => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset()); // Suma la diferencia de horarios para que no se desfase la hora
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  const year = d.getFullYear();
  return { year, month, day };
};

const EditMedicinaForm = ({ medicineData, onBack, onSuccess }) => {
  const { handleUpdate, loading, error, success } =
    useUpdateMedicine(onSuccess);

  const [medicine, setMedicine] = useState({
    nombre: "",
    unidades: "",
    YYYY: "",
    MM: "",
    DD: "",
    precio_unitario: "",
    precio_neto: "",
    proveedor: "",
    tipo_medicina: "",
    reserva: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [invalidFields, setInvalidFields] = useState({});

  useEffect(() => {
    if (medicineData) {
      const { year, month, day } = formatDate(medicineData.vencimiento);
      setMedicine({
        ...medicineData,
        nombre: medicineData.nombre || "",
        unidades: medicineData.unidades || "",
        DD: day || "",
        MM: month || "",
        YYYY: year || "",
        precio_unitario: medicineData.precio_unitario || "",
        precio_neto: medicineData.precio_neto || "",
        proveedor: medicineData.proveedor || "",
        tipo_medicina: medicineData.tipo_medicina || "",
        reserva: medicineData.reserva._id || "",
        image: null,
      });
      setImagePreview(
        `http://localhost:2659/medicine/getImg/${
          medicineData._id
        }?timestamp=${Date.now()}`
      );
    }
  }, [medicineData]);

  const {
    reservations,
    loading: reservationsLoading,
    error: reservationsError,
  } = useGetReservations();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine((prevMedicine) => {
      const updatedMedicine = {
        ...prevMedicine,
        [name]: value,
      };

      updatedMedicine.vencimiento = `${updatedMedicine.YYYY}-${updatedMedicine.MM}-${updatedMedicine.DD}`;

      return updatedMedicine;
    });
  };

  const handleImageChange = (e) => {
    setMedicine((prevMedicine) => ({
      ...prevMedicine,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(medicine._id, medicine);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChange(e);
    validateField(name, value);
};

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormField>
          <FormLabel>Nombre</FormLabel>
          <FormInput
            type="text"
            name="nombre"
            value={medicine.nombre}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <FormLabel>Unidades</FormLabel>
          <FormInput
            type="number"
            name="unidades"
            value={medicine.unidades}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <FormLabel>Vencimiento</FormLabel>
          <FormDate>
            <FormInputDate
              type="text"
              name="DD"
              value={medicine.DD}
              onChange={handleChange}
              placeholder="DD"
              maxLength={2}
              required
            />
            <span>/</span>
            <FormInputDate
              type="text"
              name="MM"
              value={medicine.MM}
              onChange={handleChange}
              placeholder="MM"
              maxLength={2}
              required
            />
            <span>/</span>
            <FormInputDate
              type="text"
              name="YYYY"
              value={medicine.YYYY}
              onChange={handleChange}
              placeholder="YYYY"
              maxLength={4}
              required
            />
          </FormDate>
        </FormField>
        <FormField>
          <FormLabel>Precio Unitario</FormLabel>
          <FormInput
            type="number"
            name="precio_unitario"
            value={medicine.precio_unitario}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <FormLabel>Precio Neto</FormLabel>
          <FormInput
            type="number"
            name="precio_neto"
            value={medicine.precio_neto}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <FormLabel>Proveedor</FormLabel>
          <FormInput
            type="text"
            name="proveedor"
            value={medicine.proveedor}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <FormLabel>Tipo de Medicina</FormLabel>
          <FormInput
            type="text"
            name="tipo_medicina"
            value={medicine.tipo_medicina}
            onChange={handleChange}
            required
          />
        </FormField>
        
        <FormSelect
  name="reserva"
  value={medicine.reserva}
  onChange={handleChange}
  disabled={reservationsLoading || !reservations.length}
>
  <option value="">Selecciona una reserva</option>
  {reservations.map((reserva) => (
    <option key={reserva._id} value={reserva._id}>
      {reserva.nombre}
    </option>
  ))}
</FormSelect>


        <FormField>
          <FormLabel>Imagen</FormLabel>
          <FormInput type="file" name="image" onChange={handleImageChange} />
        </FormField>
        <FormButton type="submit" disabled={loading || reservationsLoading}>
          {loading ? "Guardando..." : "Guardar"}
        </FormButton>
      </form>
    </FormContainer>
  );
};

export default EditMedicinaForm;
