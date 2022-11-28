import Loader from "@/components/common/loader/Loader"
import Login from "@/pages/Login/Login"
import { Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import PrivateRoutes from "./PrivateRoutes"
import PublicRoutes from "./PublicRoutes"
import { routes } from "./routes"

const Navigation = () => {
  return (
    <BrowserRouter>
        <Suspense fallback={<Loader />}>
            <>
                <Routes>
                    <Route path="/" element={<PrivateRoutes />}>
                        {
                            routes.map(route =>
                                route.private && (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        element={<route.Component />}
                                    />
                                )
                            )
                        }
                        <Route path="/*" element={<Navigate to="/home" replace />} />
                    </Route>
                    <Route path="/" element={<PublicRoutes />}>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/*" element={<Navigate to="/login" replace />} />
                    </Route>
                </Routes>
            </>
        </Suspense>
    </BrowserRouter>
  )
}

export default Navigation