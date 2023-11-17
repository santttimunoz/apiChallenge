import express from "express";

import { TeamControl } from "../controllers/TeamControl.js";
import { validateTeam } from "../middlewares/validateTeam.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateRoles } from "../middlewares/validateRoles.js";

const teamControl = new TeamControl();

const routesTeam = express.Router();

const ROLES = {
    SUPER_ADMIN: "superAdmin",
    ADMIN: "admin",
    NORMAL_USER: "normalUser"
  }

routesTeam.post(
    "/api/team",
    validateJWT,
    validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
    validateTeam,
    teamControl.SignupTeam);
routesTeam.delete(
    "/api/team/:id",
    teamControl.DeleteTeam);
routesTeam.put(
    "/api/team/:id",
    validateJWT,
    validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
    validateTeam,
    teamControl.UpdateTeam);
routesTeam.get(
    "/api/showteams",
    validateJWT,
    validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
    teamControl.SearchTeams);
routesTeam.get(
    "/api/showmembers/:id",
    validateJWT,
    validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
    teamControl.ShowMembers);    
routesTeam.post(
    "/api/teamMove",
    validateJWT,
    validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
    teamControl.SaveTeamMove);
routesTeam.get(
    "/api/teamMove",
    validateJWT,
    validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
    teamControl.ShowTeamMove
)    
   

export { routesTeam }

