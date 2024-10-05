import { getConsultaRequest } from "../../../Apis/apiDoctor"
import { useState, useCallback } from "react"
import { toast } from "react-toastify"

export const useGetConsultas = () => {
    const [consultas, setConsultas] = useState(null)

    const getConsultas = useCallback(async () => {
        try {
            const response = await getConsultaRequest()
            if (response.error) {
                return toast.error(response?.err?.response?.data?.message)
            }
            setConsultas(response.data.consulta)
        } catch (error) {
            console.log(error)
            return toast.error('Error al cargar consultas')
        }
    }, [])

    return {
        consultas,
        getConsultas,
        isFetching: !consultas
    }
}

