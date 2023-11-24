import express from "express";

import { TeamControl } from "../controllers/TeamControl.js";
import { validateTeam } from "../middlewares/validateTeam.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateRoles } from "../middlewares/validateRoles.js";

const teamControl = new TeamControl();

const routesTeamMove = express.Router();

const ROLES = {
    SUPER_ADMIN: "superAdmin",
    ADMIN: "admin",
    NORMAl_USER : "normalUser"
}
routesTeamMove.post(
    "/api/teamMove",
    validateJWT,
    validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
    teamControl.SaveTeamMove);
routesTeamMove.get(
    "/api/teamMove",
    validateJWT,
    validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
    teamControl.ShowTeamMove
)  
routesTeamMove.get(
    "/api/teamMoveList",
    validateJWT,
    validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
    teamControl.showTeamMoveList
) 
export {routesTeamMove}
