import { useState } from "react";
import { agregarPlata } from "../../../Apis/apiAdmin";
import { toast } from 'react-toastify';

export const useUpdateSaldo = (onSuccess) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleUpdate = async (id, amount) => {  // Cambié 'reserve' a 'amount'
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await agregarPlata(id, { saldo: amount });  // Enviar solo el monto, no el saldo total
            if (response.error) {
                setError(response.error.message || 'Something went wrong updating');
                toast.error(`Error: ${response.error.message || 'Something went wrong updating'}`);
            } else {
                setSuccess(true);
                toast.success('Se ha realizado exitosamente la operación');
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