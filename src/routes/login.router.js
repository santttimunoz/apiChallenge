import  express from "express";

import { LoginControl } from "../controllers/LoginControl";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateRoles } from "../middlewares/validateRoles.js";

const loginControl = new LoginControl()
const routesLogin = express.Router()

routesLogin.post("/api/login", loginControl.Login);
routesLogin.post("/api/logout", loginControl.Logout);

export { routesLogin }