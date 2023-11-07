import express from "express"
import { UserControl} from "../controllers/UserControl.js"
import { AccountControl } from "../controllers/accountControl.js"
import { LoginControl } from "../controllers/LoginControl.js"

let controlUser = new UserControl()
let accountControl = new AccountControl()
let loginControl = new LoginControl()

export let routes = express.Router()
//aqui van las validaciones
 routes.post("/api/users", controlUser.signupUser) 
 routes.delete("/api/users/:id", controlUser.deleteUser)
 routes.put("/api/users/:id", controlUser.updateUser)
 routes.get("/api/users/:id", controlUser.searchUser)

 routes.post("/api/accounts", accountControl.signupAccount)
 routes.delete("/api/accounts/:id", accountControl.deleteAccount)
 routes.put("/api/accounts/:id", accountControl.updateAccount)
 routes.get("/api/accounts/:id", accountControl.searchAccount)

 routes.post("/api/login", loginControl.Login)
 routes.post("/api/logout", loginControl.Logout)