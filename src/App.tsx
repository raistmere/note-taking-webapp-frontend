// import {useEffect} from 'react'
import './App.css'
import Login from "./components/login/Login.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import Home from "./components/Home/Home.tsx";
import Logout from "./components/Logout/Logout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>404: NOT FOUND</div>
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <div>404: NOT FOUND</div>
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <div>404: NOT FOUND</div>
  },
  {
    path: "/logout",
    element: <Logout />,
    errorElement: <div>404: NOT FOUND</div>
  }
]);

function App() {

  return (
      <RouterProvider router={router} />
  )
}

export default App
