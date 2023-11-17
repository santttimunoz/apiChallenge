import mongoose from "mongoose";

const Schema = mongoose.Schema
const teamMove = new Schema({
    idNewTeam: {
      type: Schema.Types.ObjectId,
      required: true,     
      ref: 'team'
    },
    idOldTeam:{
      type: Schema.Types.ObjectId,            
      ref: 'team'
    },
    idUser:{
      type: Schema.Types.ObjectId,
      ref: 'users',
      required : true
    },
    eventDate:{
      type: Date,
      required: true,      
    }, 
    nameNewTeam:{
      type: String,
      required: true
    },
    nameOldTeam:{
      type: String,
      required: true
    },
    userName:{
      type: String,
      required: true
    }
  }
  )

export const teamsMovemodel = mongoose.model('teamsmove', teamMove) 