import axios from "axios";

const apiClient = axios.create({
    //La base de nuestro server
    baseURL: 'http://localhost:2659/',
    timeout: 1000
})
apiClient.interceptors.request.use(
    (config) => {
        //extraemos el token de los headers
        const userDetails = localStorage.getItem('token')
        if (userDetails) {
            const token = JSON.parse(userDetails)
            config.headers.Authorization = `${token}`
            console.log(token)
        }
        return config
    },
    (err) => Promise.reject(err)
)



//Agregar usuarios
export const registerRequest = async(user)=>{
    try {
        return await apiClient.post('/user/register', user)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}
//Agregar dinero
export const reservaRequest = async(reserve)=>{
    try {
        return await apiClient.post('/reserve/saveR', reserve)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const agregarPlata = async(id, reserve)=>{
    try {
        return await apiClient.put(`/reserve/updateReserve/${id}`, reserve)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}





