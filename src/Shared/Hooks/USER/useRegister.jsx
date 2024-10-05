import { registerRequest } from "../../../Apis/apiAdmin";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useRegister = () => {
    const [user, setUser] = useState({
        name: '',
        lastname: '',
        username: '',
        password: '',
        retypePassword: '',
        phone: '',
        area: '',
        horario: '',
        role: '',
        imagesUser: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleImageChange = (file) => {
        setUser({
            ...user,
            imagesUser: file,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
    
        // Validar contraseñas
        if (user.password !== user.retypePassword) {
            setError('Las contraseñas no concuerdan');
            setLoading(false);
            return;
        }
    
        // Validar número de teléfono
        if (!/^\d{8}$/.test(user.phone)) {
            setError('El número de teléfono debe tener exactamente 8 dígitos.');
            setLoading(false);
            return;
        }
    
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("lastname", user.lastname);
        formData.append("username", user.username);
        formData.append("password", user.password);
        formData.append("retypePassword", user.retypePassword);
        formData.append("phone", user.phone);
        formData.append("area", user.area);
        formData.append("horario", user.horario);
        formData.append("role", user.role);
        formData.append("imagesUser", user.imagesUser);
        
        try {
            const response = await registerRequest(formData);

            if (response.error) {
                // Aquí manejamos el error si registerRequest falló
                const backendError = response.err.response?.data?.message;
                
                if (backendError === 'El nombre de usuario ya existe. Por favor, elige otro.') {
                    setError('Este usuario ya existe');
                } else {
                    setError(backendError || 'Algo salió mal');
                }
            } else if (response.status === 200) {
                setSuccess(true);
                setUser({
                    name: '',
                    lastname: '',
                    username: '',
                    password: '',
                    retypePassword: '',
                    phone: '',
                    area: '',
                    horario: '',
                    role: '',
                    imagesUser: null
                });
                toast.success('¡Registro exitoso!');
            } else {
                setError(response.data?.message || 'Algo salió mal');
            }
        } catch (err) {
            setError('Error inesperado. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        handleChange,
        handleImageChange,
        handleSubmit,
        loading,
        error,
        success,
    };
};
