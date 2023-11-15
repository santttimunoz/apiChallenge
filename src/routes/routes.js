import express from "express";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

//middlewares
import { routesTeam } from "./team.router.js";
import { routesUser } from "./users.router.js";
import { routesAccount } from "./account.router.js";
import { routesLogin } from "./login.router.js";


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

//routes
routes.use(routesUser);
routes.use(routesAccount)
routes.use(routesTeam)
routes.use(routesLogin)

export { routes };
