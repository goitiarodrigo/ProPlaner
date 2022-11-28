import { lazy, LazyExoticComponent } from 'react'

type JSXComponent = () => JSX.Element

interface IRoutes {
    to: string,
    path: string,
    Component: LazyExoticComponent<JSXComponent> | JSXComponent,
    name: string,
    private?: boolean,
}

const LazyLogin = lazy(() => import(/*webpackChunkName: "LazyLogin*/'pages/Login/Login'))
const LazyDashboard = lazy(() => import(/*webpackChunkName: "LazyDashboard"*/"pages/Dashboard/Dashboard"))

export const routes: IRoutes[] = [
    {
        to: '/login',
        path:'/login',
        Component: LazyLogin,
        name:'Login',
        private: false,
    },
    {
        to: '/home',
        path:'/home',
        Component: LazyDashboard,
        name:'Home',
        private: true,
    }
]