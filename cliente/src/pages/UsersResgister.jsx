 import { useState, useEffect } from "react";
 import RegisterUser from "../components/Form/RegisterUser"

 function UserRegister(){

    const [showRegisterUser, setShowRegisterUser] = useState(false);

  const openRegisterUser = () => {
    setShowRegisterUser(true);
  };
  const closeRegisterUser = () => {
    setShowRegisterUser(false);
  };

    return(
         
         <>
         <div className="container d-flex justify-content-center">
        <div className="">
          <h1 className="text-center mb-4">Registro de Usuarios</h1>
          <div className="d-flex align-items-center justify-content-between">
            <button className="btn btn-primary" onClick={openRegisterUser}>Agregar</button>
            {showRegisterUser && <button className="btn-primary" onClick={closeRegisterUser} style={{ cursor: 'pointer', marginLeft: '10px' }}>x</button>}
          </div>
          {showRegisterUser && <RegisterUser />}
        </div>
      </div>
         </>
    )           
}
export default UserRegister