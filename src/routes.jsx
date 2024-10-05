import App from "./App"
import {RoleBasedHome} from "./Shared/RoleBasedHome"
import { EditProfile } from "./Pages/User/EditProfile"
// /////////////////////////////// //
// Rutas de las vistas de Usuario //
// /////////////////////////////// //
import { HomePrincipal } from "./Pages/User/HomePrincipal"
import { QuienesSomos } from "./Pages/User/QuienesSomos"
import { Programas } from "./Pages/User/Programas"
import { Contacto } from "./Pages/User/Contacto"
import { Galeria } from "./Pages/User/Galeria"
import { Actividades } from "./Pages/User/Actividades"
import { Instalaciones } from "./Pages/User/Instalaciones"
import { Extras } from "./Pages/User/Extras"
import LayoutMain from "./Components/User/LayoutMain"
//importamos login
import { Login } from "./Components/Login/Login"

// /////////////////////////////////// //
// Rutas de las vistas de Administrador //
// ////////////////////////////////// //
import LayoutAdmin from "./Components/Admin/LayoutAdmin"
import { Usuarios } from "./Pages/Admin/Usuarios"
import { Eventos } from "./Pages/Admin/Eventos"
import { HomeAdmin } from "./Pages/Admin/HomeAdmin"
import { Medicinas } from "./Pages/Admin/Medicinas"
import { DineroAdmin } from "./Pages/Admin/DineroAdmin"
import { ConsultasAdmin } from "./Pages/Admin/ConsultasAdmin"
import { PacientesAdmin } from "./Pages/Admin/PacientesAdmin"
// /////////////////////////////////// //
// Rutas de las vistas de Doctor //
// ////////////////////////////////// //
import LayoutDoctor from "./Components/Doc/LayoutDoctor"
import { Pacientes } from "./Pages/Doctor/Pacientes"
import { Consultas } from "./Pages/Doctor/Consultas"
import { HomeDoctor } from "./Pages/Doctor/HomeDoctor"
import { EventosDoc } from "./Pages/Doctor/EventosDoc"
import { MedicinasDoc } from "./Pages/Doctor/MedicinasDoc"



// /////////////////////////////////// //
// Rutas de las vistas de Trabajador //
// ////////////////////////////////// //



export const routes = [
    {
        path: '/',
        element: <LayoutMain><HomePrincipal /></LayoutMain>
    },
    {
        path: '/home',
        element: <LayoutMain><HomePrincipal /></LayoutMain>
    },
    {
        path: '/historia',
        element: <LayoutMain><QuienesSomos /></LayoutMain>
    },
    {
        path: '/programa',
        element: <LayoutMain><Programas /></LayoutMain>
    },
    {
        path: '/contacto',
        element: <LayoutMain><Contacto /></LayoutMain>
    },
    {
        path: '/galeria',
        element: <LayoutMain><Galeria /></LayoutMain>
    },
    {
        path: '/actividades',
        element: <LayoutMain><Actividades /></LayoutMain>
    },
    {
        path: '/instalaciones',
        element: <LayoutMain><Instalaciones /></LayoutMain>
    },
    {
        path: '/extras',
        element: <LayoutMain><Extras /></LayoutMain>
    },

    //Ruta de Login jaja
    {
        path: '/login',
        element: <Login />
    },
    //  PRUEBA DE MISMA RUTA //
    {
        path: '/ansar',
        element: <RoleBasedHome />
    },
    //Editar perfil ADMIN
    {
        path: '/editar-perfil',
        element: <LayoutAdmin><EditProfile /></LayoutAdmin>
    },
    //Editar perfil Doctor
    {
        path: '/editar-perfil-doctor',
        element: <LayoutDoctor><EditProfile /></LayoutDoctor>
    },

     // //////////////////////// //
    // ///RUTAS DE ADMIN //// //
    // //////////////////////// //
    {
        path: '/home-admin',
        element: <LayoutAdmin><HomeAdmin/></LayoutAdmin>
    
    },
    {
        path: '/usuarios',
        element: <LayoutAdmin><Usuarios/></LayoutAdmin>
    
    },
    {
        path: '/eventos-ansar',
        element: <LayoutAdmin><Eventos/></LayoutAdmin>
    
    },
    {
        path: '/medicinas-ansar',
        element: <LayoutAdmin><Medicinas/></LayoutAdmin>
    
    },
    {
        path: '/dinero-ansar',
        element: <LayoutAdmin><DineroAdmin/></LayoutAdmin>
    
    },
    {
        path: '/pacientes-ansar',
        element: <LayoutAdmin><PacientesAdmin/></LayoutAdmin>
    
    },
    {
        path: '/consultas-ansar',
        element: <LayoutAdmin><ConsultasAdmin/></LayoutAdmin>
    
    },



    // //////////////////////// //
    // ///RUTAS DE DOCTOR //// //
    // //////////////////////// //
    {
        path: '/home-doctor',
        element: <LayoutDoctor><HomeDoctor/></LayoutDoctor>
    
    },
    {
        path: '/pacientes',
        element: <LayoutDoctor><Pacientes/></LayoutDoctor>
    
    },
    {
        path: '/consultas',
        element: <LayoutDoctor><Consultas/></LayoutDoctor>
    },
    {
        path: '/medicinas',
        element: <LayoutDoctor><MedicinasDoc/></LayoutDoctor>
    },
    {
        path: '/eventos',
        element: <LayoutDoctor><EventosDoc/></LayoutDoctor>
    }

    // //////////////////////// //
    // //RUTAS DE TRABAJADOR // //
    // //////////////////////// //
    
]
