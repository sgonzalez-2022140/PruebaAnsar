import { useState, useEffect} from 'react'
import { getSaldoRequest } from '../../../Apis/apiGeneral';

export const useGetReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            try {
                const response = await getSaldoRequest();
                setReservations(response.data);  
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    return { reservations, loading, error };
};