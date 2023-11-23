import express from "express";

import { AccountControl } from "../controllers/accountControl.js";
import { validateAccount } from "../middlewares/validateAccount.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateRoles } from "../middlewares/validateRoles.js";

const accountControl = new AccountControl()

const routesAccount = express.Router()

const ROLES = {
    SUPER_ADMIN: "superAdmin",
    ADMIN: "admin",
    NORMAL_USER: "normalUser"
}

routesAccount.post(
    "/api/accounts",
    validateJWT,
    validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
    validateAccount,
    accountControl.signupAccount);
routesAccount.delete(
    "/api/accounts/:id",
    validateJWT,
    validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
    accountControl.deleteAccount);
routesAccount.put(
    "/api/accounts/:id",
    validateJWT,
    validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
    validateAccount,
    accountControl.updateAccount);
routesAccount.get(
    "/api/accounts/:id",
    validateJWT,
    validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
    accountControl.searchAccount);
    routesAccount.get(
        "/api/accounts",
        validateJWT,
        validateRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
        accountControl.searchAccounts);


export { routesAccount }
