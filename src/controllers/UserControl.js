import { UserService } from "../services/UserService.js";
import jwt from "jsonwebtoken";
export class UserControl {
  constructor() {}
  async signupUser(request, response) {
    try {
      let serviceUser = new UserService();
      let data = request.body;
      let newUser = await serviceUser.signupUser(data);       
      response.status(200).json({
        mensaje: "exito en el envio de info",        
        data: {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }
      });
    } catch (error) {
      console.log(error);
      response.status(400).json({
        mensaje: "falla en el envio de info",
        data: error,
      });
    }
  }
  async deleteUser(request, response) {
    try {
      let serviceUser = new UserService();
      let id = request.params.id;
      await serviceUser.deleteUser(id);
      response.status(200).json({
        mensaje: "exito eliminando los datos",
        data: "id del usuario eliminado" + id,
      });
    } catch (error) {
      response.status(400).json({
        mensaje: "error al eliminar los datos",
        datos: null,
      });
    }
  }
  async updateUser(request, response) {
    try {
      let serviceUser = new UserService();
      let id = request.params.id;
      let data = request.body;
      await serviceUser.updateUser(id, data);
      response.status(200).json({
        mensaje: "exito actulizando datos",
        data: data,
      });
    } catch (error) {
      response.status(400).json({
        mensaje: "error al actualizar",
        data: null,
      });
    }
  }
  async searchUser(request, response) {
    try {
      let serviceUser = new UserService();
      let id = request.params.id;
      response.status(200).json({
        mensaje: "exito en la busqueda del usuario",
        data: await serviceUser.searchUser(id),
      });
    } catch (error) {
      response.status(400).json({
        mensaje: "error en la busqueda",
        data: null,
      });
    }
  }
  async SearcAllUsers(request, response) {
    try {
      let serviceUser = new UserService();
      response.status(200).json({
        message: "exito buscando los usuarios",
        users: await serviceUser.searcAllUsers(),
      });
    } catch (error) {
      response.status(200).json({
        message: "error buscando los usuarios",
        users: null,
      });
    }
  }
}
