import RegisterTeam from "../components/Form/RegisterTeam"
function TeamRegister(){
   return(
        <>
        <div className="container d-flex justify-content-center">
        <div className="">       
           <h1 className="text-center mb-4">registro de usuarios</h1>
           <RegisterTeam></RegisterTeam>            
           </div> 
            </div>      
       </>
   )           
}
export default TeamRegister