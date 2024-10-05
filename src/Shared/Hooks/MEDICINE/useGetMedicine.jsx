import toast from "react-hot-toast"
import { useState, useCallback } from "react"
import { getMedicineRequest } from "../../../Apis/apiGeneral"

export const useGetMedicine = () => {
  const [medicine, setMedicine] = useState(null)

  const getMedicine = useCallback(async () => {
    const response = await getMedicineRequest()
    console.log(response)
    if (response.error) {
      return toast.error(
        response?.err?.response?.data?.message || 'Error al obtener las medicinas'
      );
    }
    setMedicine(response.data.medicine || response.data)
  }, []);

  return {
    medicine,
    isFetching: medicine === null,
    getMedicine
  }
}
