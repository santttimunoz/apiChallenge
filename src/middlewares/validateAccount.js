import { checkSchema } from "express-validator";
import { validationResult } from 'express-validator';
export const validateAccount = [
    checkSchema({
        accountName: {
            in: ['body'],
            notEmpty: {
                 errorMessage: 'accountName should be not empty'
            }           
        },
        clientName:{
            in: ['body'],  
            notEmpty:{
                  errorMessage: 'clientName should not be empty'
            }                    
        },
        operationResponsible: {
            in: ['body'],            
            notEmpty :{
                errorMessage : 'operationResponsible should not be empty'
            }
        },
        teamQuery: {
            in : ['body'],
            optional : true                       
        }        
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