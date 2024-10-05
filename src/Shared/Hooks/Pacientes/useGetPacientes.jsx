import toast from "react-hot-toast"
import { getPacientesRequest } from "../../../Apis/apiDoctor"
import { useState, useCallback } from "react"

export const useGetpacientes = () => {
    const [pacientes, setPacientes] = useState(null)

    const getPacientes = useCallback(async () => {
        try {
            const response = await getPacientesRequest()
            if (response.error) {
                return toast.error(response?.err?.response?.data?.message)
            }
            setPacientes(response.data.pacientes)
        } catch (error) {
            console.log(error)
            return toast.error('Error al cargar pacientes')
        }
    }, [])

    return {
        pacientes,
        getPacientes,
        isFetching: !pacientes
    }
}

