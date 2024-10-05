import { useState } from 'react';
import { generarPDFRequest } from '../../../Apis/apiGeneral';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const useGenerarPDF = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generarPDF = async ({ id, paciente }) => {
        try {
            setLoading(true);
            setError(null);
            await generarPDFRequest(id, paciente);
            console.log('PDF generado correctamente', {
            });
        } catch (error) {
            setError(error);
            error('Error generando PDF', {
            });
        } finally {
            setLoading(false);
        }
    };

    return { generarPDF, loading, error };
};
