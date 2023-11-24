import express from "express";

import { TeamControl } from "../controllers/TeamControl.js";
import { validateTeam } from "../middlewares/validateTeam.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateRoles } from "../middlewares/validateRoles.js";
import { ROLES } from "../constants/roles.js";
const teamControl = new TeamControl();

const routesTeam = express.Router();



routesTeam.post(
  "/api/team",
  validateJWT,
  validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  validateTeam,
  teamControl.SignupTeam
);
routesTeam.delete("/api/team/:id", teamControl.DeleteTeam);
routesTeam.put(
  "/api/team/:id",
  validateJWT,
  validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  validateTeam,
  teamControl.UpdateTeam
);
routesTeam.get(
  "/api/team",
  validateJWT,
  validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  teamControl.SearchTeams
);
routesTeam.get(
  "/api/team/:id",
  validateJWT,
  validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  //cambiar nobre de esta funcion 
  teamControl.ShowMembers
);

// routesTeam.get(
//   "/api/showmembers/:id",
//   validateJWT,
//   validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
//   teamControl.SearchTeam
// );

export { routesTeam, ROLES };
