export const useLogout = () => {
    console.log('Estoy cerrando la sesión')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    window.location.href = '/login'    
}