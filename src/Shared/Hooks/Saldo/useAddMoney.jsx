import { useState } from "react";
import { reservaRequest } from "../../../Apis/apiAdmin";

export const useAddMoney = () => {
    const [reserva, setReserva] = useState({
        saldo: '',
        gastos: '',
        extras: '',
        razon_actualizacion: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReserva(prevReserva => ({
            ...prevReserva,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await reservaRequest(reserva);
            if (response.error) {
                setError(response.error.message || 'Something went wrong');
            } else {
                setSuccess(true);
                setReserva({
                    saldo: '',
                    gastos: '',
                    extras: '',
                    razon_actualizacion: ''
                }); // Limpia los campos del formulario
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return {
        reserva,
        handleChange,
        handleSubmit,
        loading,
        error,
        success,
    };
};
