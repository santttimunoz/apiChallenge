import { checkSchema } from "express-validator";
import { modelUser } from "../models/UserMo.js";
import { validationResult } from 'express-validator';
export const validateTeam = [
    checkSchema({
        name: {
            in: ['body'],
            notEmpty: true,
            errorMessage: 'name should be not empty'
        },
        members: {
            in: ['body'],
            custom: {
                //members son los ids que se pasan al arreglo 
                options: async (members) => {
                    // Validar que los miembros sean IDs válidos de la colección de usuarios
                    //$in se utiliza para seleccionar los valores del campo _id que se encuentren en el arreglo members
                    const userCount = await modelUser.countDocuments({ _id: { $in: members } });
                    if (userCount !== members.length) {
                        throw new Error('id invalido en los members');
                    }
                    return true;
                },
            },
        },            
    }),
    (request, response, next)=>{
        const errors = validationResult(request);
         if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg)
            return response.status(400).json({ errors: errorMessages })
         }
      next();
    }
]