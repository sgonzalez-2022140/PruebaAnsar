import { useState } from "react"
import {useLogout as logOut} from "./useLogout"

const getUserDetails = ()=>{

    const loggedUser = localStorage.getItem('user')
    if(loggedUser) return JSON.parse(loggedUser)
    return null
}
const logoutSys = ()=>{
    logOut()
}
export const useUserDetails = () => {
    const [loggedUser, setUserDetails] = useState(getUserDetails())
        

  return {
    isLogged: Boolean(loggedUser),
    uid: loggedUser?._id ? loggedUser.uid : 'Guest',
    username: loggedUser?.username ? loggedUser.username : 'Guest',
    name: loggedUser?.name ? loggedUser.name : 'Guest',
    logoutSys
  }
}