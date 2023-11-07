import { modelUser } from "../models/UserMo.js";
import bcrypt from 'bcrypt'


export class UserService{
    constructor(){

    }
    async signupUser(data){        
        let user = new modelUser(data)      
        user.password = await bcrypt.hash(user.password, 10)          
        await user.save()        
        return user
    }
    async deleteUser(id){        
        await modelUser.findByIdAndDelete(id)
    }
    async updateUser(id, data){
        await modelUser.findByIdAndUpdate(id, data)
    }
    async searchUser(id){
        await modelUser.findById(id)
    }
}