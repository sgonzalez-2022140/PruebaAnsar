import { useState } from 'react';
import { deleteConsultaRequest } from '../../../Apis/apiDoctor';

export const useDeleteConsulta = (onSuccess) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async (id) => {
        setLoading(true);
        setError('');
        try {
            const response = await deleteConsultaRequest(id);
            console.log(id)
            if (response.error) {
                setError(response.err.message || 'Something went wrong');
            } else {
                onSuccess();
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return {
        handleDelete,
        loading,
        error,
    };
};