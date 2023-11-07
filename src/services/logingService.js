import { modelUser } from "../models/UserMo.js";
import bcrypt from 'bcrypt'

export class LoginService {
    constructor() {

    }
    async validateLog(data) {
        let userFound = await modelUser.findOne({ email: data.email })        
        let isMatch = await bcrypt.compare(data.password, userFound.password)   
        if(isMatch){
            return  userFound
        }             
    }
}