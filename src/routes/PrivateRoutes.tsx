import NavBar from "@/components/navBar/NavBar"
import { Navigate, Outlet } from "react-router"

const PrivateRoutes = () => {
   return (
      !localStorage.getItem('login') ?
         <Navigate to='/login'/>
      :
         <>
            <NavBar />
            <Outlet />
         </>
   )
}

export default PrivateRoutes