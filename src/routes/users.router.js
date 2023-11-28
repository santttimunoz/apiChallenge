import express from "express";

import { UserControl } from "../controllers/UserControl.js";
import { validateUser } from "../middlewares/validateUser.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateRoles } from "../middlewares/validateRoles.js";
import { ROLES } from "./team.router.js";
const controlUser = new UserControl();

const routesUser = express.Router();



routesUser.post(
  "/api/users",
  validateJWT,
  validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  validateUser,
  controlUser.createUser
);
routesUser.delete(
  "/api/users/:id",
  validateJWT,
  validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  controlUser.deleteUser
);
routesUser.put(
  "/api/users/:id",
  validateJWT,
  validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  controlUser.updateUser
);
routesUser.get(
  "/api/users/:id",
  validateJWT,
  validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  controlUser.searchUser
);
//consulta perfil
routesUser.get(
  "/api/profile",
  validateJWT,
  validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.NORMAL_USER]),
  controlUser.searchProfile
);
routesUser.put(
  "/api/profile",
  validateJWT,
  validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.NORMAL_USER]),
  controlUser.updateProfile
);
routesUser.get(
  "/api/users",
  validateJWT,
  validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  controlUser.SearcAllUsers
);

export { routesUser };
