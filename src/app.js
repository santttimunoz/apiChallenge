import  express  from "express"
import { establecerConexionDB } from "../src/dataBase.js"
import { routes } from "./routes/routes.js"


export class Api{
    constructor(){
        this.app = express()  
        this.conectarBD()     
        this.procesarPeticiones() 
    }
    levantarServer(){
        this.app.listen(3000, function(){
            console.log("servidor encendido")
        })
    }
    conectarBD(){
        establecerConexionDB()
    }
    procesarPeticiones(){
        this.app.use(express.json())
         this.app.use("/", routes)
    }
}