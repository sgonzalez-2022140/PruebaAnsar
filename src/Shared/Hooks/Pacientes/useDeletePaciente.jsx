import { useState } from 'react';
import { deletepacienteRequest } from '../../../Apis/apiDoctor';
import { toast } from 'react-toastify';

export const useDeletePaciente = (onSuccess) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async (id) => {
        setLoading(true);
        setError('');
        try {
            const response = await deletepacienteRequest(id);
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