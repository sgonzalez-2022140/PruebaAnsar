import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomePrincipal } from './Pages/User/HomePrincipal';

function App() {
  return (
    <>
      <HomePrincipal />
      <ToastContainer />
    </>
  );
}

export default App;
