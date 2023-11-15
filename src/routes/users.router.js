import express from "express";
import { UserControl } from "../controllers/UserControl.js";
import { validateUser } from "../middlewares/validateUser.js";

let controlUser = new UserControl();

export let routesUser = express.Router();

routesUser.post("/api/users", validateUser, controlUser.signupUser);
routesUser.delete("/api/users/:id", controlUser.deleteUser);
routesUser.put("/api/users/:id", controlUser.updateUser);
routesUser.get("/api/users/:id", controlUser.searchUser);
routesUser.get("/api/users", controlUser.SearcAllUsers);
