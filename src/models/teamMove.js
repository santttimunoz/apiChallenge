import mongoose from "mongoose";

const Schema = mongoose.Schema
const teamMove = Schema({
    teamName:{
        type: String        
    },
    idUsers:[{
        type: Schema.Types.ObjectId,
        ref:'users'
    }],
    idTeam:{
        type: Schema.Types.ObjectId,
        ref:'teams'
    },    
    // dateIn:{
    //     type: Number,
    //     default: Date.now()
    // },   
},
{
    timestamps: true
})

export const teamsMovemodel = mongoose.model('teamsmove', teamMove) 