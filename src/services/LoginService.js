import { modelUser } from "../models/UserMo.js";
import bcrypt from 'bcrypt'

export class LoginService {
    constructor() {

    }
    async validateLog({email,password}) {                        
        let userFound = await modelUser.findOne({ email: email })  
        if(!userFound || !userFound.password){
            return null
        } 
        let isMatch = await bcrypt.compare(password, userFound.password)   
        if(isMatch){
            return  userFound
        }             
    }
}