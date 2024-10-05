import toast from "react-hot-toast"
import { getUsersRequest } from "../../../Apis/apiGeneral"
import { useState } from "react"


export const useGetUsers = () => {
    const [users, setUsers] = useState(null);
  
    
    const  getUsers = async() =>{
        try {
            const response = await getUsersRequest();

            if(response.error){
                return toast.error(response?.err?.response?.data?.message)
            }
            setUsers(response.data.user)

        } catch (error) {
            console.log(error);
            return toast.error('Error al cargar usuarios')
        }
    }

    return {
        users,
        getUsers,
        isFetching: !users
    }
}


