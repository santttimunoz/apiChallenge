import express from "express";

import { UserControl } from "../controllers/UserControl.js";
import { validateUser } from "../middlewares/validateUser.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateRoles } from "../middlewares/validateRoles.js";

const controlUser = new UserControl();

const routesUser = express.Router();

const ROLES = {
  SUPER_ADMIN: "superAdmin",
  ADMIN: "admin",
  NORMAL_USER: "normalUser",
};

routesUser.post(
  "/api/users",
  validateJWT,
  validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  validateUser,
  controlUser.signupUser
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
routesUser.get(
  "/api/users",
  validateJWT,
  validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  controlUser.SearcAllUsers
);

export { routesUser };
