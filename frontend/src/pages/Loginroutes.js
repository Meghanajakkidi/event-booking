import { Navigate, Outlet } from "react-router-dom"

function Loginroutes(){
    const loginuser = localStorage.getItem("loginuser")
    return(
        loginuser ? <Outlet/> : <Navigate to="login"/>
    )
}


export default Loginroutes