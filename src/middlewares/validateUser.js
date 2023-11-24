 import { body, validationResult } from 'express-validator';

 //primera forma de validar segun expressValidator
// export const validateUser = [
//     body('name').notEmpty(),
//     body('email').isEmail(),
//     body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
//     body('role').notEmpty(),
//     body('englishLevel').notEmpty(),
//     body('knowledge').notEmpty(),
//     body('linkCv').notEmpty(),
//     (request, response, next) => {
//         const errors = validationResult(request);
//         if (!errors.isEmpty()) {
//             return response.status(400).json({ errors: errors.array() });
//         }
//         next();
//     }
// ];


import { checkSchema } from "express-validator";

export const validateUser = [
    checkSchema({
        name: {
            in: ['body'],            
            notEmpty: true,
            errorMessage: 'name should be not empty'
        },
        email:{
            in: ['body'],
            isEmail: true,
            errorMessage: 'this field must be an email'
        },
        password: {
            in: ['body'],
            isLength:{
                options: { min : 8},
                errorMessage : 'password must have 8 characters at least'
            } ,
            notEmpty :{
                errorMessage : 'password should not be empty'
            }
        },
        role: {
            in : ['body'],
            notEmpty : {
                errorMessage : 'password should not be empty'
            }            
        },
        englishLevel : {
            in : ['body'],                        
        },
        knowledge:{
            in : ['body'],                     
        },
        linkCv : {
            in : ['body'],                      
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


