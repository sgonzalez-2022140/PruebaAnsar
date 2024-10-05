import { useState } from "react";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../Apis/apiGeneral";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    //este lo usaremos para que cuando se logee reedireccione al Home que le corresponde
    const navigate = useNavigate()
 
    const login = async (account, password) => {
        setIsLoading(true);
        const user = {
            account,
            password
        };

        try {
            // Respuesta de usuario con axios
            const response = await loginRequest(user);
            setIsLoading(false);

            if (response.error) {
                return toast.error(
                    response?.error?.response?.data ||
                    'Error al intentar logearse'
                );
            }

            const { loggedUser, message, token } = response.data;
            console.log(response.data);

            // Guardar la siguiente info del usuario y token 
            localStorage.setItem('user', JSON.stringify(loggedUser));
            localStorage.setItem('token', JSON.stringify(token));
            
            if (token) {
                navigate('/ansar');
                return toast.success(message);
            }
        } catch (error) {
            setIsLoading(false);
            return toast.error(
                error?.response?.data ||
                'Error al intentar logearse'
            );
        }
    }

    return { 
        login, 
        isLoading 
    }
}

