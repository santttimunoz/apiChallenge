import mongoose from "mongoose"; 

export async function establecerConexionDB(){
    //el trycatch sirve para el manejo de la exepcion(si por alguna razon no puede hacer conexion)
    try {
        const connect = await mongoose.connect(process.env.DB)
        const miColeccion = connect.connection.collection("apichallenge");
        console.log("exito al conectar db")
    } catch (error) {
        console.log("error: "+error)
    }
}