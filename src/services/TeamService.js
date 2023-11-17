import mongoose from "mongoose";
import { teamModel } from "../models/teamMo.js";
import { teamsMovemodel } from "../models/teamMove.js";
import { modelUser } from "../models/UserMo.js";

export class TeamService {
  constructor() {

  }
  async SignupTeam(data) {
    const team = new teamModel(data);
    return await team.save();
  }
  async DeleteTeam(id) {
    //validar que el equipo no tenga usuarios
    const team = await teamModel.findByIdAndDelete(id).exec();
    return team;
  }
  async UpdateTeam(id, data) {
    let obj = {
      name : data.name
    }
    let team = await teamModel.findByIdAndUpdate(id, { $set: obj }).exec();
    return team;
  }
  async SearchTeams() {
    let team = await teamModel.find();
    return team;
  }
  async ShowMembers(id) {
    let populatedUser = await teamModel.findById(id).populate("members").exec();
    return populatedUser;
  }
 
  async TeamMove(data) {
    if (data.idNewTeam == data.idOldTeam) {
      throw new error("registrando movimiento para el mismo equipo");
    }
    let oldTeam = await teamModel.findById(data.idOldTeam);
    if (!oldTeam) {
      throw new error("no existe equipo de salida");
    }    
    let newTeam = await teamModel.findById(data.idNewTeam);
    if (!newTeam) {
      throw new error("no equipo de destino");
    }    
    let user = await modelUser.findById(data.idUser).exec()//mejor traer una funcion de userService
    if(!user){
      throw new error("usuario no existe");
    }

    oldTeam.members.pull(data.idUser).save();    
    newTeam.members.push(data.idUser).save();
    // let oldTeamName = await teamModel.findById(data.idOldTeam)
    // let newTeamName = await teamModel.findById(data.idNewTeam)
    
    const teamM = new teamsMovemodel({
      idNewTeam: data.idNewTeam,
      idOldTeame: data.idOldTeam,
      idUser: data.idUser,
      eventDate: new Date(),
      nameNewTeam: newTeam.name,
      nameOldTeam: oldTeam.name,
      userName: user.name
    });
    // let teamM = new teamsMovemodel(data);
    return (await teamM.save()).toJSON();
  }

  async ShowTeamMove(data) {
    const{nameNewTeam, userName, eventDate, idUser} = data
    let filter = {
    }
    if(idUser){
      filter.idUser = idUser
    }
    if (nameNewTeam) {
      filter.nameNewTeam = { $regex: new RegExp(nameNewTeam, 'i') };      
    }
    if(userName){
      filter.userName = userName
    }
    if(eventDate){
      filter.eventDate = eventDate
    }
    let teamM = await teamsMovemodel.find(filter);
    return teamM;
  }
}
