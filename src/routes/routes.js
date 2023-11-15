import express from "express";
import { LoginControl } from "../controllers/LoginControl.js";
import { TeamControl } from "../controllers/TeamControl.js";
import { AccountControl } from "../controllers/accountControl.js";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

//middlewares
import { validateAccount } from "../middlewares/validateAccount.js";
import { validateTeam } from "../middlewares/validateTeam.js";
import { routesUser } from "./users.router.js";

let accountControl = new AccountControl();
let loginControl = new LoginControl();
let teamControl = new TeamControl();

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

const routes = express.Router();

routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//aqui van las validaciones
routes.use(routesUser);
routes.post("/api/accounts", validateAccount, accountControl.signupAccount);
routes.delete("/api/accounts/:id", accountControl.deleteAccount);
routes.put("/api/accounts/:id", accountControl.updateAccount);
routes.get("/api/accounts/:id", accountControl.searchAccount);

routes.post("/api/login", loginControl.Login);
routes.post("/api/logout", loginControl.Logout);

routes.post("/api/team", validateTeam, teamControl.SignupTeam);
routes.delete("/api/teamdeleted/:id", teamControl.DeleteTeam);
routes.put("/api/teamupdate/:id", teamControl.UpdateTeam);
routes.get("/api/showteams", teamControl.SearchTeams);
routes.get("/api/showmembers/:id", teamControl.ShowMembers);
routes.get("/api/teamMove", teamControl.ShowTeamMove);

export { routes };
//  {
//     "nombre" : "jorge",
//     "email" : "jorge@gmail.com",
//     "password" : "1234",
//     "teamsid" : ["", ""]
//   }
