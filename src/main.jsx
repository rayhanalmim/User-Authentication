import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import MyCreateRoute from './MyCreateRoute/MyCreateRoute.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={MyCreateRoute}></RouterProvider>
  </React.StrictMode>,
)
