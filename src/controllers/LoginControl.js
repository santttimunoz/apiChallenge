import { LoginService } from "../services/logIngService.js";
import jwt from 'jsonwebtoken'

export class LoginControl {
    constructor() {

    }
    async Login(request, response) {
        try {
            let loginService = new LoginService()
            let data = request.body            
            let userFound = await loginService.validateLog(data)
            let token = jwt.sign({
                id: userFound._id
            }, 'admin123',
            {expiresIn: '1d'})
            response.cookie('token', token)
            if (userFound) {
                return response.status(200).json({
                    message: "validacion exitosa"                
                })
            } else {
                return response.status(404).json({
                    message: "validacion denegada"
                })
            }
        } catch (error) {
            response.status(400).json({
                message: "error en la validacion"
            })
        }
    }
    Logout(request, response){
        response.cookie('token', '')        
        return response.sendStatus(200)
    }
}