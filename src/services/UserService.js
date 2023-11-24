import { modelUser } from "../models/UserMo.js";
import { teamModel } from "../models/teamMo.js";
import { ROLES } from "../constants/roles.js";
import bcrypt from "bcrypt";

export class UserService {
  constructor() {}
  invalidRole(newRole, userRoleJWT) {
    return (
      newRole == ROLES.SUPER_ADMIN ||
      (newRole == ROLES.ADMIN && userRoleJWT !== ROLES.SUPER_ADMIN)
    );
  }
  validate(data, userRoleJWT) {
    if (this.invalidRole(data.role, userRoleJWT)) {
      throw new Error("no tienes permisos para crear este rol");
    }
  }

  async createUser({ idTeam, ...data }, userRoleJWT) {
    this.validate(data, userRoleJWT);

    let team = await teamModel.findById(idTeam);
    if (!team) {
      throw new Error("equipo no existe");
    }
    let user = new modelUser(data);

    user.password = await bcrypt.hash(user.password, 10);
    let newUser = await user.save();

    // delete newUser.password;
    team.members.push(newUser._id);
    team.save();
    return {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  }
  async deleteUser(id, userIdJWT) {
    if (userIdJWT == id) {
      throw new Error("no puedes eliminar tus propios datos");
    }
    //let user = await modelUser.findById(id)
    let teams = await teamModel.find();

    for (let i = 0; i < teams.length; i++) {
      let team = teams[i];

      // Buscar al usuario en los miembros del equipo
      let index = team.members.indexOf(id);

      if (index !== -1) {
        // Si el usuario está en el equipo, quitarlo
        team.members.splice(index, 1);

        // Guardar el equipo modificado en la base de datos
        await team.save();
      }
    }

    return await modelUser.findByIdAndDelete(id);
  }
  async updateUser(id, data, userRoleJWT) {
    if (data.role) {
      this.validate(data, userRoleJWT);
    }
    let newUser = await modelUser.findByIdAndUpdate(id, data, { new: true });
    // delete newUser.password;
    return {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      englishLevel: newUser.englishLevel,
      knowledge: newUser.knowledge,
      linkCv: newUser.linkCv,
    };
  }
  async searchUser(id) {
    let user = await modelUser.findById(id);
    return user;
  }
  async searcAllUsers() {
    let users = modelUser.find();
    return users;
  }
  async searchProfile(userIdJWT) {
    if (!userIdJWT) {
      throw new Error("el Usuario no esta logeado");
    }
    let profile = await modelUser.findById(userIdJWT);
    return {
      id: profile._id,
      name: profile.name,
      email: profile.email,
      role: profile.role,
      englishLevel: profile.englishLevel,
      knowledge: profile.knowledge,
      linkCv: profile.linkCv,
    };
  }
}
