import { Outlet, Navigate } from 'react-router-dom'

export default function Auth () {
    let user = true
    return user ? <Outlet/> : <Navigate replace to={'/login'}/>
}