import { useGetUsers } from "../../Shared/Hooks/USER/useGetUsers"
import { useEffect } from "react"

export const MyUsers = () => {
    const { users, getUsers, isFetching} = useGetUsers()
 
    useEffect(() => {
      getUsers();
    }, [getUsers])
    
    if (isFetching){
        return <div>Cargando...</div>
    }


    return (
    <>
        {users && users.map(user =>(
            <div key={user._id}>
                <p>Name: {user.name} </p>
                <p>Lastname: {user.lastname} </p>
                <p>Phone: {user.phone} </p>
            </div>
        ))}

    </>
  )
}
