import { UserService } from "../services/UserService.js";

export class UserControl {
  constructor() {}
  async createUser(request, response) {
    try {
      const { role: userRoleJWT } = request.payload;
      let serviceUser = new UserService();
      let data = request.body;
      let newUser = await serviceUser.createUser(data, userRoleJWT);
      // let info = newUser.map((user) => {
      //   return {
      //     id: user.id,
      //     name: user.name,
      //     email: user.email,
      //     role: user.role,
      //     englishLevel: user.englishLevel,
      //     knowledge: user.knowledge,
      //     linkCv: user.linkCv,
      //   };
      // });
      response.status(200).json({
        mensaje: "exito en la creacion del usuario",
        data: newUser,
      });
    } catch (error) {
      console.log(error);
      // Código 11000 es un código de error de MongoDB que indica duplicados (clave única duplicada)
      if (error.code === 11000) {
        response.status(400).json({
          mensaje: "algun campo duplicado, por favor ingrese datos distintos",
          data: error,
        });
      } else {
        response.status(400).json({
          mensaje: "falla en la creacion del usuario",
          data: error,
        });
      }
    }
  }
  async deleteUser(request, response) {
    try {
      const{userId: userIdJWT} = request.payload
      let serviceUser = new UserService();
      let id = request.params.id;
      await serviceUser.deleteUser(id, userIdJWT);
      response.status(200).json({
        mensaje: "exito eliminando los datos",
        data: "id del usuario eliminado: " + id,
      });
    } catch (error) {
      response.status(400).json({
        mensaje: "error al eliminar los datos: "+ error.message,
        datos: null,
      });
    }
  }
  async updateUser(request, response) {
    try {
      const { role: userRoleJWT } = request.payload;
      let serviceUser = new UserService();
      let id = request.params.id;
      let data = request.body;
      let updateUser = await serviceUser.updateUser(id, data, userRoleJWT);
      response.status(200).json({
        mensaje: "exito actulizando datos",
        updateUser: updateUser,
      });
    } catch (error) {
      response.status(400).json({
        mensaje: "error al actualizar los datos: " + error.message,
        updateUser: null,
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
        mensaje: "error en la busqueda del usuario",
        data: null,
      });
    }
  }
  async SearcAllUsers(request, response) {
    try {
      let serviceUser = new UserService();
      let users = await serviceUser.searcAllUsers();

      let info = users.map((users) => {
        return {
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          englishLevel: users.englishLevel,
          knowledge: users.knowledge,
          linkCv: users.linkCv,
        };
      });
      response.status(200).json({
        message: "exito buscando los usuarios",
        users: info,
      });
    } catch (error) {
      response.status(400).json({
        message: "error buscando los usuarios",
        users: null,
      });
    }
  }
  async searchProfile(request, response) {
    try {
      const{userId: userIdJWT} = request.payload
      let userService = new UserService()
      let profile = await userService.searchProfile(userIdJWT)
      response.status(200).json({
        message: "perfil del usuario",
        profile: profile
      })
    } catch (error) {
      response.status(400).json({
        message: "falla buscando el perfil del usuario: "+error.message,
        profile: null
      })
    }
  }
}
