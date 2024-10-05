import { useState, useEffect } from 'react';
import { getDoctorsRequest } from '../../../Apis/apiGeneral';
import toast from "react-hot-toast";

export const useDoctors = () => {
    const [doctors, setDoctors] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const getDoctors = async () => {
        setIsFetching(true);
        try {
            const response = await getDoctorsRequest();
            console.log('Response from API:', response);
            if (response.error) {
                toast.error(response?.err?.response?.data?.message || 'Error desconocido');
            } else {
                setDoctors(response.data.doctors);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error al cargar doctores');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        getDoctors();
    }, []);

    return {
        doctors,
        getDoctors,
        isFetching
    };
};