import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//Booostrap
import 'bootstrap/dist/css/bootstrap.min.css';
//Rutas
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes.jsx';
import { Toaster } from 'react-hot-toast'

export const Main = () => {
  const elementRoutes = useRoutes(routes)
  return (
    <>
    {elementRoutes}
    <Toaster position='bottom-right' reverseOrder={false}/>
    </>
    
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Main></Main>
    </BrowserRouter>
  </React.StrictMode>
)
