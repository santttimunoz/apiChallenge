import express from "express";

import { TeamControl } from "../controllers/TeamControl.js";
import { validateTeam } from "../middlewares/validateTeam.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateRoles } from "../middlewares/validateRoles.js";

const teamControl = new TeamControl();

const routesTeam = express.Router();


routesTeam.post("/api/team", validateTeam, teamControl.SignupTeam);
routesTeam.delete("/api/team/:id", teamControl.DeleteTeam);
routesTeam.put("/api/team/:id", teamControl.UpdateTeam);
routesTeam.get("/api/showteams", teamControl.SearchTeams);
routesTeam.get("/api/showmembers/:id", teamControl.ShowMembers);
routesTeam.get("/api/teamMove", teamControl.ShowTeamMove);

export { routesTeam }


