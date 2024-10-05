//importaremos todos los Homes y que jueguen dependiendo del backend para no crear ruta por ruta
import { NotFoundPage } from "../Pages/NotFoundPage";
import { HomeAdmin } from "../Pages/Admin/HomeAdmin";
import { HomeDoctor } from '../Pages/Doctor/HomeDoctor';
import { HomeWorker } from '../Pages/Worker/HomeWorker';
//Layout de ADMIN
import LayoutAdmin from "../Components/Admin/LayoutAdmin";
import LayoutDoctor from "../Components/Doc/LayoutDoctor";



export const RoleBasedHome = () => {
    const userDetails = localStorage.getItem('user');
    const role = userDetails ? JSON.parse(userDetails).role : null;
  
    switch (role) {
      case 'ADMIN':
        return <LayoutAdmin><HomeAdmin /></LayoutAdmin>;
      case 'DOCTOR':
        return <LayoutDoctor><HomeDoctor /></LayoutDoctor>;
      case 'WORKER':
        return <HomeWorker />;
      default:
        return <NotFoundPage />;
    }
  };
  
   