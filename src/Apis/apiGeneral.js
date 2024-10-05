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

//Este es un api general pero lo pongo aqui por comodidad
export const loginRequest = async(user)=>{
    try {
        console.log(user)
        return await apiClient.post('/user/login', user)
        
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getUsersRequest = async()=>{
    try {
        return await apiClient.get('user/getUser')
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getDoctorsRequest = async()=>{
    try {
        return await apiClient.get('user/getDoctors')
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

// -*-*-*-*getMedicine-*-*-*-*
export const getMedicineRequest = async()=>{
    try{
        const response = await apiClient.get('medicine/getMedicine')
        return { data: response.data }
    }catch (err){
        return{
            error: true,
            err
        }
    }
}

// -*-*-*-*saveMedicine-*-*-*-*
export const saveMedicineRequest = async(medicine)=>{
    try {
        return await apiClient.post('/medicine/saveM', medicine)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

// -*-*-*-*UpdateMedicine-*-*-*-*
export const updateMedicineRequest = async(id, medicine) => {
    try{
    return await apiClient.put(`/medicine/updateMedicine/${id}`, medicine,{
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

//-*-*-*-*DeleteMedicine-*-*-*-*
export const deleteMedicineRequest = async (id) => {
    try {
        return await apiClient.delete(`/medicine/deleteMedicine/${id}`)
    } catch (err) {
        return {
            error: true,
            err,
        }
    }
}

//Ver saldo
export const getSaldoRequest = async()=>{
    try{
        const response = await apiClient.get('/reserve/getAllReservas')
        return { data: response.data }
    }catch (err){
        return{
            error: true,
            err
        }
    }
}

// -*-*-*-*GenerarPDF-*-*-*-*
export const generarPDFRequest = async (id, paciente) => {
    try {
        const response = await apiClient.get(`/consulta/generarPDF/${id}`, {
            responseType: 'blob', // respuesta manejada como un blob
        })

        if (response.status === 200) {
            // Crear una nueva ventana el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Consulta_${paciente}.pdf`) // usar el nombre del paciente
            document.body.appendChild(link)
            link.click()
            link.parentNode.removeChild(link)

            return { data: response.data }
        } else {
            return { error: true, message: 'Error al generar la factura' }
        }
    } catch (error) {
        console.error('Error al descargar la factura:', error)
        return { error: true, message: error.message }
    }
};


//-*-*-*-*UserInfo-*-*-*-*
export const getUserMyUserRequest = async () => {
    try {
        const response = await apiClient.get(`/user/getUserMyUser`);
        return response.data; // Devuelve los datos del usuario
    } catch (err) {
        return{
            error: true,
            err
        }
    }
};

export const getSaldoPrincipal = async () =>{
    try {
        const response = await apiClient.get(`/reserve/getsaldo`);
        return response.data; 
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}