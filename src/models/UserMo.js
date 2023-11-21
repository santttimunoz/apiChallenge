import mongoose from "mongoose"

const Schema = mongoose.Schema

const user = new Schema({    
    name:{
        type: String,
        required: true,
        //el trim limpia los espacion en el string
        trim: true,        
    },
    email:{
        type: String,
        required: true,
        trim: true,
        //unique hace no se guadern dos email iguales
        unique: true
    },
    password:{
        type: String,
        required: true
    },   
    role:{
        type: String,
        required: true
    },
    //agregar resto de campos 
    englishLevel:{
        type: String,        
    },
    knowledge:{
        type: String,        
    },
    linkCv:{
        type: String,        
    }   
    //no todos capos son obligatorios
})

export const modelUser = mongoose.model('users', user)
