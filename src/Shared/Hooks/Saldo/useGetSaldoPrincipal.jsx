import { useState, useEffect } from 'react';
import { getSaldoPrincipal } from '../../../Apis/apiGeneral';
import { toast } from 'react-toastify';

export const useGetSaldoPrincipal = () => {
    const [saldo, setSaldo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSaldo = async () => {
        const result = await getSaldoPrincipal();

        if (result.error) {
            setError(result.err);
            toast.error('Error obteniendo el saldo');
        } else {
            setSaldo(result.saldo);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchSaldo();
    }, []);

    return { saldo, loading, error, refetch: fetchSaldo };  // Retorna `refetch`
};
