import { Routes, Route  } from "react-router-dom"
import Home from "../components/Home/Home.jsx"
import UserRegister from "../pages/UsersResgister.jsx"
import AccountRegister from "../pages/AccountRegister.jsx"
import TeamRegister from "../pages/TeamRegister.jsx"
export function Rutas(){
    return(
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/userRegister" element={<UserRegister/>}/>
            <Route path="/accountRegister" element={<AccountRegister/>}/>
            <Route path="/teamRegister" element={<TeamRegister/>}/>
        </Routes>
        </>
    )
}