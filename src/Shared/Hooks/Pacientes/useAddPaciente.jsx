import { useState } from 'react';
import { addPacienteRequest } from '../../../Apis/apiDoctor';
import { toast } from 'react-toastify';

export const useAddPaciente = (onSuccess) => {
    const [paciente, setPaciente] = useState({
        nombre: '',
        sexo: '',
        DD: '',
        MM: '',
        YYYY: '',
        telefono: '',
        direccion: '',
        deleted: false,
        user: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaciente({
            ...paciente,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        const fechaDeNacimiento = `${paciente.YYYY}-${paciente.MM}-${paciente.DD}`;

        const pacienteData = {
            ...paciente,
            fechaDeNacimiento,
        };

        try {
            const response = await addPacienteRequest(pacienteData);
            if (response.error) {
                setError(response.error.message || 'Something went wrong adding');
                toast.error(`Error: ${response.error.message || 'Something went wrong adding'}`);
            } else {
                setSuccess(true);
                toast.success('Paciente agregado correctamente!');
                setPaciente({
                    nombre: '',
                    sexo: '',
                    DD: '',
                    MM: '',
                    YYYY: '',
                    telefono: '',
                    direccion: '',
                    deleted: false,
                    user: ''
                }); // Limpia los campos del formulario
                if (onSuccess) onSuccess();
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
            toast.error(`Error: ${err.message || 'Something went wrong adding'}`);
        } finally {
            setLoading(false);
        }
    };

    return {
        paciente,
        handleChange,
        handleSubmit,
        loading,
    };
};
