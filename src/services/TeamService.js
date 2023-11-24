import mongoose from "mongoose";
import { teamModel } from "../models/teamMo.js";
import { teamsMovemodel } from "../models/teamMove.js";
import { modelUser } from "../models/UserMo.js";

export class TeamService {
  constructor() {}
  async SignupTeam(data) {
    let users = await modelUser.find()
    let teams = await teamModel.find();
    for (let i = 0; i < teams.length; i++) {
      let existingTeam = teams[i];
      for (let j = 0; j < data.members.length; j++) {
        let newMember = data.members[i];
        let userExists = users.some((user) => user._id === newMember);
        if (!userExists) {
          throw new Error(`El usuario con ID ${newMember} no existe`);
        }
        if (existingTeam.members.includes(newMember)) {
          throw new Error(
            `El usuario ${newMember} ya está en el equipo ${existingTeam.name}`
          );
        }
      }
    }
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
      name: data.name,
    };
    let team = await teamModel.findByIdAndUpdate(
      id,
      { $set: obj },
      { new: true }
    );
    return team;
  }
  async SearchTeams() {
    let team = await teamModel.find();
    return team;
  }
  //deshabilitar funcion
  async SearchTeam(id) {
    let team = await teamModel.findById(id);
    if (!team == null) {
      throw new Error("el equipo no existe");
    }
    return team;
  }
  async ShowMembers(id) {
    let populatedTeam = await teamModel.findById(id).populate("members").exec();
    if (!populatedTeam) {
      throw new Error("No se encontró un equipo con el ID proporcionado");
    }
    let teamInfo = {
      id: populatedTeam._id,
      name: populatedTeam.name,
    };

    let users = populatedTeam.members.map((user) => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    });
    return {
      team: teamInfo,
      members: users,
    };
  }

  async TeamMove(data) {
    if (data.idNewTeam == data.idOldTeam) {
      throw new Error("registrando movimiento para el mismo equipo");
    }
    let oldTeam = await teamModel.findById(data.idOldTeam);
    if (!oldTeam) {
      throw new Error("no existe equipo de salida");
    }
    let newTeam = await teamModel.findById(data.idNewTeam);
    if (!newTeam) {
      throw new Error("no equipo de destino");
    }
    let user = await modelUser.findById(data.idUser).exec(); //mejor traer una funcion de userService
    if (!user) {
      throw new Error("usuario no existe");
    }

    oldTeam.members.pull(data.idUser);
    newTeam.members.push(data.idUser);

    oldTeam.save();
    newTeam.save();
    // let oldTeamName = await teamModel.findById(data.idOldTeam)
    // let newTeamName = await teamModel.findById(data.idNewTeam)

    const teamM = new teamsMovemodel({
      idNewTeam: data.idNewTeam,
      idOldTeam: data.idOldTeam,
      idUser: data.idUser,
      eventDate: data.eventDate || new Date(),
      nameNewTeam: newTeam.name,
      nameOldTeam: oldTeam.name,
      userName: user.name,
    });
    // let teamM = new teamsMovemodel(data);
    return (await teamM.save()).toJSON();
  }

  async ShowTeamMove(data) {
    const { nameNewTeam, userName, eventDate, idUser } = data;
    let filter = {};
    if (idUser) {
      filter.idUser = { $regex: new RegExp(idUser, "i") };
    }
    if (nameNewTeam) {
      filter.nameNewTeam = { $regex: new RegExp(nameNewTeam, "i") };
    }
    if (userName) {
      filter.userName = { $regex: new RegExp(userName, "i") };
    }
    if (eventDate) {
      filter.eventDate = { $regex: new RegExp(eventDate, "i") };
    }
    let teamM = await teamsMovemodel.find(filter);
    return teamM;
  }
  async ShowTeamMoveList() {
    let team = await teamsMovemodel.find();
    return team;
  }
}
