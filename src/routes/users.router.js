import express from "express";
import { UserControl } from "../controllers/UserControl.js";
import { validateUser } from "../middlewares/validateUser.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateRoles } from "../middlewares/validateRoles.js";

let controlUser = new UserControl();

export let routesUser = express.Router();

routesUser.post(
  "/api/users",
  validateJWT,
  validateUser,
  controlUser.signupUser
);
routesUser.delete("/api/users/:id", validateJWT, controlUser.deleteUser);
routesUser.put("/api/users/:id", validateJWT, controlUser.updateUser);
routesUser.get("/api/users/:id", validateJWT, controlUser.searchUser);
routesUser.get(
  "/api/users",
  validateJWT,
  validateRoles(["admin"]),
  controlUser.SearcAllUsers
);
