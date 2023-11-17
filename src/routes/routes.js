import express from "express";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { options } from "../swaggerConfig.js";

//middlewares
import { routesTeam } from "./team.router.js";
import { routesUser } from "./users.router.js";
import { routesAccount } from "./account.router.js";
import { routesLogin } from "./login.router.js";

export const specs = swaggerJsdoc(options);

const routes = express.Router();

routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones relacionadas con usuarios
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario.
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario.
 *       required:
 *         - name
 *         - email
 *  
 * /api/users:
 *   get:
 *     summary: trae una lista de usuarios
 *     tags:
 *       - Users 
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario en el sistema.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Usuario creado exitosamente.
 *       '400':
 *         description: Error en la solicitud o datos inválidos.
 *       '401':
 *         description: No autorizado, token inválido o caducado.
 *       '403':
 *         description: No tiene permisos para realizar esta acción.
 *       '500':
 *         description: Error interno del servidor.
 *    
 * 
 * /api/users/:id:
 *   get:
 *    summary: trae un usuario especificado por id
 *    tags:
 *       - Users
 *   put:
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario en el sistema.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Usuario actualizado exitosamente.
 *       '400':
 *         description: Error en la solicitud o datos inválidos.
 *       '401':
 *         description: No autorizado, token inválido o caducado.
 *       '403':
 *         description: No tiene permisos para realizar esta acción.
 *       '500':
 *         description: Error interno del servidor.
 *   delete:
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario en el sistema.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Usuario creado exitosamente.
 *       '400':
 *         description: Error en la solicitud o datos inválidos.
 *       '401':
 *         description: No autorizado, token inválido o caducado.
 *       '403':
 *         description: No tiene permisos para realizar esta acción.
 *       '500':
 *         description: Error interno del servidor.
 *
 */
routes.use(routesUser);

routes.use(routesAccount);
routes.use(routesTeam);
routes.use(routesLogin);

export { routes };
