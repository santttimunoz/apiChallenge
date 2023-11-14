import express, { Router } from "express"
import { UserControl} from "../controllers/UserControl.js"
import { AccountControl } from "../controllers/accountControl.js"
import { LoginControl } from "../controllers/LoginControl.js"
import { TeamControl } from "../controllers/TeamControl.js"

//middlewares
import { validateUser } from "../middlewares/validateUser.js"
import { validateAccount } from "../middlewares/validateAccount.js"
import { validateTeam } from "../middlewares/validateTeam.js"

let controlUser = new UserControl()
let accountControl = new AccountControl()
let loginControl = new LoginControl()
let teamControl = new TeamControl()

export let routes = express.Router()
//aqui van las validaciones 
 routes.post("/api/users",  validateUser, controlUser.signupUser) 
 routes.delete("/api/users/:id", controlUser.deleteUser)
 routes.put("/api/users/:id", controlUser.updateUser)
 routes.get("/api/users/:id", controlUser.searchUser)
 routes.get("/api/users", controlUser.SearcAllUsers) 

 routes.post("/api/accounts", validateAccount, accountControl.signupAccount)
 routes.delete("/api/accounts/:id", accountControl.deleteAccount)
 routes.put("/api/accounts/:id", accountControl.updateAccount)
 routes.get("/api/accounts/:id", accountControl.searchAccount)

 routes.post("/api/login", loginControl.Login)
 routes.post("/api/logout", loginControl.Logout)

 routes.post("/api/team", validateTeam, teamControl.SignupTeam)
 routes.delete("/api/teamdeleted/:id", teamControl.DeleteTeam)
 routes.put("/api/teamupdate/:id", teamControl.UpdateTeam)
 routes.get("/api/showteams", teamControl.SearchTeams)
 routes.get("/api/showmembers/:id", teamControl.ShowMembers)
 routes.get("/api/teamMove", teamControl.ShowTeamMove)
 

//  {
//     "nombre" : "jorge",
//     "email" : "jorge@gmail.com",
//     "password" : "1234",
//     "teamsid" : ["", ""]
//   }