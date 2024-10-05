import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetConsultasByPaciente } from '../../Shared/Hooks/Consulta/useGetConsultaByPaciente.jsx';
import { useDeleteConsulta } from '../../Shared/Hooks/Consulta/useDeleteConsulta.jsx';
import { FaArrowLeft, FaRegEdit, FaTrash, FaFilePdf } from "react-icons/fa";
import { HashLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../Components/Admin/Modal.jsx';
import { EditConsultaForm } from './EditConsultaForm.jsx';
import { useGenerarPDF } from '../../Shared/Hooks/Consulta/useGenerarPDF.jsx';

// --------- Estilos
const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #0B8AD9;
  font-size: 24px;
  position: absolute;
  margin-bottom: 20px;
  top: 20px;
  left: 20px;
  &:hover {
    color: #005f99;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
`;

const ConsultasContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centra los elementos en el contenedor */
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const ConsultaCard = styled.div`
  position: relative;
  border: 3px solid #0B8AD9;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  width: 300px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const ConsultaCardBody = styled.div`
  margin: 10px 0;
`;

const ConsultaCardTitle = styled.h2`
  margin-top: 0;
  font-weight: bold;
`;

const Label = styled.span`
  font-weight: bold;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const PdfButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
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

const NoConsultasMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

const formatDate = (date) => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset()); // Suma la diferencia de horarios para que no se desfase la hora
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// ---------- Componente
export const GetConsultaPorPaciente = ({ pacienteId, onBack }) => {
  const { consultas, isFetching, getConsultasByPaciente } = useGetConsultasByPaciente(pacienteId);
  const { generarPDF, loading: pdfLoading, error: pdfError } = useGenerarPDF();
  const [pageIndex, setPageIndex] = useState(0);
  const itemsPerPage = 4;
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedConsulta, setSelectedConsulta] = useState(null);

  // Elimina la consulta
  const { handleDelete, loading: deleteLoading, error: deleteError } = useDeleteConsulta(() => {
    toast.success('Consulta eliminada correctamente!');
    getConsultasByPaciente(pacienteId);
  });

  // Si hay cambios actualiza las cartas a mostrar
  useEffect(() => {
    getConsultasByPaciente(pacienteId);
  }, [getConsultasByPaciente, pacienteId]);

  // Salta al momento de que la consulta no se pueda eliminar
  useEffect(() => {
    if (deleteError) {
      toast.error('Error eliminando la consulta');
    }
  }, [deleteError]);

  // Maneja los errores al generar el PDF
  useEffect(() => {
    if (pdfError) {
      toast.error('Error generando PDF');
    }
  }, [pdfError]);

  // Abre el modal para editar una consulta, al igual que le manda los datos
  const handleEditClick = (consulta) => {
    setSelectedConsulta(consulta);
    setShowEditModal(true);
  };

  // Cierra el modal y recarga los datos
  const handleSuccess = () => {
    getConsultasByPaciente(pacienteId);
    setShowEditModal(false);
  };

  // Páginación para cuando los datos excenden de los item por página (4)
  const paginatedConsultas = consultas ? consultas.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage) : [];
  const totalPages = consultas ? Math.ceil(consultas.length / itemsPerPage) : 0;

  // Página inicial
  const handlePageChange = (index) => {
    setPageIndex(index);
  };

  // exporta el pdf con nombre del user
  const handlePdfClick = (consulta) => {
    generarPDF({ id: consulta._id, paciente: consulta.paciente.nombre });
    toast.success('PDF generado correctamente');
  };

  return (
    <PageContainer>
      <BackButton onClick={onBack}>
        <FaArrowLeft />
      </BackButton>
      <ConsultasContainer>
        {isFetching || deleteLoading || pdfLoading ? (
          <LoaderContainer>
            <HashLoader color="#0b8ad9" loading={true} size={50} />
          </LoaderContainer>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {paginatedConsultas && paginatedConsultas.length > 0 ? (
              paginatedConsultas.map(consulta => (
                <ConsultaCard key={consulta._id} onClick={() => handleEditClick(consulta)}>
                  <ConsultaCardBody>
                    <p><Label>Motivo:</Label> {consulta.motivo}</p>
                    <p><Label>Diagnóstico:</Label> {consulta.diagnostico}</p>
                    <p><Label>Fecha:</Label> {formatDate(consulta.fecha)}</p>
                    <p><Label>Tratamiento:</Label> {consulta.tratamiento}</p>
                    <p><Label>Presupuesto:</Label> {consulta.presupuesto}</p>
                  </ConsultaCardBody>
                  <PdfButton onClick={(e) => { e.stopPropagation(); handlePdfClick(consulta); }}>
                    <FaFilePdf size={30} color="red" />
                  </PdfButton>
                  <DeleteButton onClick={(e) => { e.stopPropagation(); handleDelete(consulta._id); }}>
                    <FaTrash size={20} color="red" />
                  </DeleteButton>
                </ConsultaCard>
              ))
            ) : (
              <NoConsultasMessage>
                <p>No hay consultas disponibles para este paciente.</p>
              </NoConsultasMessage>
            )}
          </div>
        )}
      </ConsultasContainer>
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
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Editar"
        icon={FaRegEdit}
      >
        {selectedConsulta && (
          <EditConsultaForm
            consultaData={selectedConsulta}
            onBack={() => setShowEditModal(false)}
            onSuccess={handleSuccess}
          />
        )}
      </Modal>
      <ToastContainer />
    </PageContainer>
  );
};
