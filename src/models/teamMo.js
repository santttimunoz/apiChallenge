import mongoose from "mongoose";

const Schema = mongoose.Schema

const team = new Schema({
    name:{
        type:String,
        required: true
    },
    menbers:[{
      type:Schema.Types.ObjectId,
      ref:'accounts'  
    }]
})

export const teamModel = mongoose.model('team', team)

