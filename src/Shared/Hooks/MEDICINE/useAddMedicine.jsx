import { useState, useEffect } from "react";
import { saveMedicineRequest } from "../../../Apis/apiGeneral";
import { toast } from 'react-toastify';

export const useAddMedicine = (onSuccess, reservaPrincipalId) => {
    const [medicine, setMedicine] = useState({
        nombre: '',
        unidades: '',
        DD: '',
        MM: '',
        YYYY: '',
        precio_unitario: '',
        precio_neto: '',
        proveedor: '',
        tipo_medicina: '',
        reserva: reservaPrincipalId || '', // Inicializa con el ID de la reserva principal
        image: null
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (reservaPrincipalId) {
            setMedicine((prevMedicine) => ({
                ...prevMedicine,
                reserva: reservaPrincipalId,
            }));
        }
    }, [reservaPrincipalId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedicine((prevMedicine) => ({
            ...prevMedicine,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setMedicine((prevMedicine) => ({
            ...prevMedicine,
            image: e.target.files[0],
        }));
    };

    const isValidDate = (day, month, year) => {
        const date = new Date(`${year}-${month}-${day}T00:00:00`);
        if (!date || date.getFullYear() !== parseInt(year) || (date.getMonth() + 1) !== parseInt(month) || date.getDate() !== parseInt(day)) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        // Validar la fecha de vencimiento
        const { DD, MM, YYYY } = medicine;
        if (!isValidDate(DD, MM, YYYY)) {
            setError('Fecha de vencimiento inválida. Verifique el día, mes y año.');
            toast.error('Fecha de vencimiento inválida. Verifique el día, mes y año.');
            setLoading(false);
            return;
        }
    
        const vencimiento = `${YYYY}-${MM}-${DD}`;
        const formData = new FormData();
        for (const key in medicine) {
            if (key !== 'DD' && key !== 'MM' && key !== 'YYYY') {
                formData.append(key, medicine[key]);
            }
        }
        formData.append('vencimiento', vencimiento);
    
        // Log para depurar
        console.log('FormData:', [...formData.entries()]);
    
        try {
            const response = await saveMedicineRequest(formData);
            if (response.error) {
                setError(response.error.message || 'Something went wrong');
                toast.error(`Error: ${response.error.message || 'Something went wrong'}`);
            } else {
                setSuccess(true);
                toast.success('Medicina agregada correctamente!');
                setMedicine({
                    nombre: '',
                    unidades: '',
                    DD: '',
                    MM: '',
                    YYYY: '',
                    precio_unitario: '',
                    precio_neto: '',
                    proveedor: '',
                    tipo_medicina: '',
                    reserva: '',
                    image: null
                }); // Limpia los campos del formulario
                if (onSuccess) onSuccess();
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
            console.error("Error details:", err);  // Log the error details for debugging
            toast.error(`Error: ${err.message || 'Something went wrong'}`);
        } finally {
            setLoading(false);
        }
    };

    return {
        medicine,
        handleChange,
        handleImageChange,
        handleSubmit,
        loading,
        error,
        success,
    };
};
