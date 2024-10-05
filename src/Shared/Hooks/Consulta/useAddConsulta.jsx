import { useState } from "react";
import { addConsultaRequest } from "../../../Apis/apiDoctor";
import { toast } from "react-toastify";

export const useAddConsulta = (onSuccess) => {
  const [consulta, setConsulta] = useState({
    motivo: '',
    diagnostico: '',
    tratamiento: '',
    paciente: '', // El paciente no es requerido
    presupuesto: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsulta((prevConsulta) => ({
      ...prevConsulta,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await addConsultaRequest(consulta);
      if (response.error) {
        setError(response.error.message || 'Something went wrong');
        toast.error(`Error: ${response.error.message || 'Something went wrong'}`);
      } else {
        setSuccess(true);
        toast.success('Consulta creada correctamente!');
        setConsulta({
          motivo: '',
          diagnostico: '',
          tratamiento: '',
          paciente: '', // Limpia los campos del formulario
          presupuesto: ''
        });
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    consulta,
    handleChange,
    handleSubmit,
    loading,
    error,
    success,
  };
};
