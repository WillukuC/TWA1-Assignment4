import React from 'react'
import ReactDOM from 'react-dom/client'
import Signup from './signup.tsx'
import Login from './login.tsx'
import Home from './home.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: "/", element: <Login /> },{ path: "/movies", element: <Home /> }, { path: "/signup", element: <Signup /> }, { path: "/login", element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
