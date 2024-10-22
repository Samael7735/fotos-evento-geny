import React from "react"
import {createBrowserRouter, RouterProvider } from "react-router-dom"
//importe as páginas que serão renderizadas nas rotas
import Home from "../Pages/Home/Home"
import Contact from "../Pages/Contact/Contact"
import ViewPhotos from "../Pages/ViewPhotos/ViewPhotos"

//crie as rotas com o caminho e o destino dentro do roteador
const router = createBrowserRouter (
  [
    //criar rotas
    {path : "/", element : <Home/>},
    {path : '/Contato', element : <Contact/>},
    {path : '/Fotos', element : <ViewPhotos/>},
  ]
)
export const Routes = ()=>{
  return (
    <RouterProvider router={router} />
  )
}

export default Routes