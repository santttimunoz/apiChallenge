import RegisterAccount from "../components/Form/registerAccount"
function AccountRegister(){
    return(
         <>
         <div className="container d-flex justify-content-center">
         <div className="">       
            <h1 className="text-center mb-4">registro de cuenta</h1>
            <RegisterAccount></RegisterAccount>            
            </div> 
             </div>      
        </>
    )           
}
export default AccountRegister