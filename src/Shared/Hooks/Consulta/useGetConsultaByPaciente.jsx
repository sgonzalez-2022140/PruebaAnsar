import toast from "react-hot-toast";
import { getConsultasByPacienteRequest } from "../../../Apis/apiDoctor";
import { useState, useCallback } from "react";

export const useGetConsultasByPaciente = (pacienteId) => {
  const [consultas, setConsultas] = useState(null);

  const getConsultasByPaciente = useCallback(async () => {
    try {
      const response = await getConsultasByPacienteRequest(pacienteId);
      if (response.error) {
        return toast.error(response?.err?.response?.data?.message);
      }
      setConsultas(response.data.consulta);
    } catch (error) {
      console.log(error);
      return toast.error('Error al cargar consultas del paciente');
    }
  }, [pacienteId]);

  return {
    consultas,
    getConsultasByPaciente,
    isFetching: !consultas,
  };
};
