import axios from "axios";

const apiClient = axios.create({
    //La base de nuestro server
    baseURL: 'http://localhost:2659/',
    timeout: 5000
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
export const addPacienteRequest = async(data)=>{
    try {
        return await apiClient.post('/paciente/save', data)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getPacientesRequest = async()=>{
    try{
        const response = await apiClient.get('paciente/getByLogged')
        return { data: response.data }
    }catch (err){
        return{
            error: true,
            err
        }
    }
}

// -*-*-*-*Trae todos los pacientes-*-*-*-*
export const getPacientesAdminRequest = async()=>{
    try{
        const response = await apiClient.get('paciente/get')
        return { data: response.data }
    }catch (err){
        return{
            error: true,
            err
        }
    }
}
//-*-*-*-*UpdatePaciente-*-*-*-*
export const updatePacienteRequest = async(id, paciente) => {
    try{
        return await apiClient.put(`/paciente/update/${id}`, paciente)
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

//-*-*-*-*DeletePaciente-*-*-*-*
export const deletepacienteRequest = async (id) => {
    try {
        return await apiClient.put(`/paciente/delete/${id}`)
    } catch (err) {
        return {
            error: true,
            err,
        }
    }
}
// ------- CONSULTAS 

// Agregar
export const addConsultaRequest = async (data) => {
    try {
        return await apiClient.post(`/consulta/guardar`, data)
    } catch (err) {
        return {
            error: true,
            err,
        }
    }
}

// Traer 
export const getConsultaRequest = async () => {
    try {
        const response = await apiClient.get('/consulta/listarByUserLogged')
        return { data: response.data }
    } catch (err) {
        return {
            error: true,
            err,
        }
    }
}

// Consulta por paciente 
export const getConsultasByPacienteRequest = async (paciente) => {
    try {
        const response = await apiClient.get(`/consulta/listarByPaciente/${paciente}`)
        return { data: response.data }
    } catch (err) {
        return {
            error: true,
            err,
        }
    }
}

// Eliminar 
export const deleteConsultaRequest = async (id) => {
    try {
        const response = await apiClient.delete(`/consulta/eliminar/${id}`)
        return { data: response.data }
    } catch (err) {
        return {
            error: true,
            err,
        }
    }
}

// Actualizar 
export const updateConsultaRequest = async (id, consulta) => {
    try {
        const response = await apiClient.put(`/consulta/editar/${id}`, consulta)
        return { data: response.data }
    } catch (err) {
        return {
            error: true,
            err,
        }
    }
}