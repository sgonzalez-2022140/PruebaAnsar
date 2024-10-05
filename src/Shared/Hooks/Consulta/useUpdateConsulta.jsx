import { useState } from "react";
import { updateConsultaRequest } from "../../../Apis/apiDoctor";
import { toast } from 'react-toastify';

export const useUpdateConsulta = (onSuccess) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleUpdate = async (id, consulta) => {
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await updateConsultaRequest(id, consulta);
            if (response.error) {
                setError(response.error.message || 'Something went wrong updating');
                toast.error(`Error: ${response.error.message || 'Something went wrong updating'}`);
            } else {
                setSuccess(true);
                toast.success('Consulta actualizado correctamente!');
                if (onSuccess) onSuccess();
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
            toast.error(`Error: ${err.message || 'Something went wrong updating'}`);
        } finally {
            setLoading(false);
        }
    };

    return {
        handleUpdate,
        loading,
        error,
        success,
    };
};
