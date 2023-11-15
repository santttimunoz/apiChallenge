import express from "express";

import { AccountControl } from "../controllers/accountControl.js";
import { validateAccount } from "../middlewares/validateAccount.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateRoles } from "../middlewares/validateRoles.js";

const accountControl = new AccountControl()

const routesAccount = express.Router()

routesAccount.post("/api/accounts", validateAccount, accountControl.signupAccount);
routesAccount.delete("/api/accounts/:id", accountControl.deleteAccount);
routesAccount.put("/api/accounts/:id", accountControl.updateAccount);
routesAccount.get("/api/accounts/:id", accountControl.searchAccount);

export { routesAccount }
