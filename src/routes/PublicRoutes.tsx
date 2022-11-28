import { Navigate, Outlet } from "react-router"

const PublicRoutes = () => {
    return (
        localStorage.getItem('login') ?
            <Navigate to='/home'/>
        :
            <Outlet />
      )
}

export default PublicRoutes