import { useState } from "react";
import { updateMedicineRequest } from "../../../Apis/apiGeneral";
import { toast } from 'react-toastify';

export const useUpdateMedicine = (onSuccess) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleUpdate = async (id, medicine) => {
        setLoading(true);
        setError('');
        setSuccess(false);

        const formData = new FormData();
        for (const key in medicine) {
            formData.append(key, medicine[key]);
        }

        try {
            const response = await updateMedicineRequest(id, formData);
            if (response.error) {
                setError(response.error.message || 'Something went wrong');
                toast.error(`Error: ${response.error.message || 'Something went wrong'}`);
            } else {
                setSuccess(true);
                toast.success('Medicina actualizada correctamente!');
                if (onSuccess) onSuccess();
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
            toast.error(`Error: ${err.message || 'Something went wrong'}`);
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
