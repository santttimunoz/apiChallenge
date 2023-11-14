import mongoose from "mongoose";

const Schema = mongoose.Schema

const team = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
}, {
  timestamps: true
}
)

export const teamModel = mongoose.model('teams', team)

