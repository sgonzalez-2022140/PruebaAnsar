import { useState } from 'react';
import { deleteMedicineRequest } from '../../../Apis/apiGeneral';
import { toast } from 'react-toastify';

export const useDeleteMedicine = (onSuccess) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async (id) => {
        setLoading(true);
        setError('');
        try {
            const response = await deleteMedicineRequest(id);
            if (response.error) {
                setError(response.error.message || 'Something went wrong');
                toast.error(`Error: ${response.error.message || 'Something went wrong'}`);
            } else {
                toast.success('Medicina eliminada correctamente!');
                onSuccess();
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
            toast.error(`Error: ${err.message || 'Something went wrong'}`);
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
