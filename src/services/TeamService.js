import mongoose from "mongoose";
import { teamModel } from "../models/teamMo.js";
import { teamsMovemodel } from "../models/teamMove.js";

export class TeamService{
    constructor(){

    }
    async SignupTeam(data){
        // let team = new teamModel(data)
        // return await team.save() 
        // agregar registro movimiento             
        const session = await mongoose.startSession()
        session.startTransaction()

        try {
            const team = new teamModel(data)
            const savedTeam = await team.save()

            const teamMove = new teamsMovemodel({
                teamName: team.name,
                idUsers: savedTeam.members,
                idTeam: savedTeam._id,                
            });
            await teamMove.save()

            await session.commitTransaction()
            session.endSession()
            return savedTeam

        } catch (error) {
            await session.abortTransaction()
            session.endSession()
            throw error
        }
    }
    async DeleteTeam(id){
        const session = await mongoose.startSession()
        session.startTransaction()
        try{                             
            const team = await teamModel.findById(id)            
            const teamMove = new teamsMovemodel({
                teamName: team.name,
                idUsers: team.members,
                idTeam: team._id,                
            });
            await teamMove.save()
            await teamModel.findByIdAndDelete(id)

            await session.commitTransaction()
            session.endSession()
            return team
        }catch(error){
            await session.abortTransaction()
            session.endSession()
            throw error;
        }
        
    }
    async UpdateTeam(id, data){
        let team = await teamModel.findByIdAndUpdate(id, data)
        let teamMove = new teamsMovemodel({
            teamName: team.name,
            idUsers: team.members,
            idTeam: team._id
        })
        await teamMove.save()
        return team        
    }
    async SearchTeams(){        
        let team = await teamModel.find()
        return team
    }
    async ShowMembers(id){       
        let populatedUser = await teamModel.findById(id).populate('members').exec()
        return populatedUser
    }   
    async ShowTeamMove(){
        let teamMove = await teamsMovemodel.find()
        return teamMove
    }     
}