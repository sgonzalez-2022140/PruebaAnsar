import toast from "react-hot-toast"
import { getPacientesAdminRequest } from "../../../Apis/apiDoctor"
import { useState, useCallback } from "react"

export const useGetpacienteAdmin = () => {
    const [pacientes, setPacientes] = useState(null)

    const getPacientes = useCallback(async () => {
        try {
            const response = await getPacientesAdminRequest()
            console.log(response)

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

