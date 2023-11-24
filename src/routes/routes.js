import express from "express";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { options } from "../swaggerConfig.js";

//middlewares
import { routesTeam } from "./team.router.js";
import { routesTeamMove } from "./teamMove.router.js";
import { routesUser } from "./users.router.js";
import { routesAccount } from "./account.router.js";
import { routesLogin } from "./login.router.js";

export const specs = swaggerJsdoc(options);

const routes = express.Router();


routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * tags:
 *   name: LogIn
 *   description: Operaciones relacionadas con inicio de sesion.
 *
 * components:
 *   securitySchemes: #muestra el cuadro de autorizacion en la interfaz de usuario de swagger
 *    bearerAuth:           
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *   schemas:
 *     LogIn:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email del usuario.
 *         password:
 *           type: string
 *           description: Contraseña del usuaruio.         
 *       required:
 *         - email
 *         - password

 * 
 * /api/login:
 *   post:
 *     summary: Permite el inicio de sesion
 *     description: Ingreso a la aplicacion
 *     tags:
 *       - LogIn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               email: josua@gmail.com
 *               password: andres123.
 *             $ref: '#/components/schemas/LogIn'
 *     responses:
 *       '200':
 *         description: validacion exitosa.
 *         content:
 *          application/json:
 *            example:
 *              message: validacion exitosa.
 *       '404':
 *         description: validacion denegada.       
 *         content:
 *          application/json:
 *            example:
 *              message: validacion denegada.
 *       '400':
 *         description: Error en la validacion.       
 *         content:
 *          application/json:
 *            example:
 *              message: error en la validacion.  
 * 
 */
routes.use(routesLogin);

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
 *         password:
 *           type: string
 *           description: Contraseña del usuario.
 *         role:
 *           type: string
 *           description: Tipo de usuario.
 *         englishLevel:
 *           type: string
 *           description: Nivel de ingles del usuario.
 *         knowledge:
 *           type: string
 *           description: Conocimiento del usuario.
 *         linkCv:
 *           type: string
 *           description: Link del curriculum vitae del usuario.
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 * 
 * /api/profile:
 *   get:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Trae el perfil del usuario logeado.
 *     description: Trae una lista de usuarios
 *     tags:
 *       - Users 
 *     schema:
 *      $ref: 'api/components/schemas/User'  
 *     responses:
 *       '200':
 *         description: exito buscando los usuarios.
 *         content:
 *          application/json:
 *            example:
 *              message: exito buscando los usuarios.
 *       '400':
 *         description: error buscando los usuarios.       
 *         content:
 *          application/json:
 *            example:
 *              message: error buscando los usuarios.
 * 
 * 
 * /api/users:
 *   get:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Trae una lista de usuarios.
 *     description: Trae una lista de usuarios
 *     tags:
 *       - Users 
 *     schema:
 *      $ref: 'api/components/schemas/User'  
 *     responses:
 *       '200':
 *         description: exito buscando los usuarios.
 *         content:
 *          application/json:
 *            example:
 *              message: exito buscando los usuarios.
 *       '400':
 *         description: error buscando los usuarios.       
 *         content:
 *          application/json:
 *            example:
 *              message: error buscando los usuarios.
 *   post:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario en el sistema.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            example:
 *              name: alfredo vargas
 *              email: alfre@gmail.com
 *              password: afredorio12.
 *              role: user
 *              idTeam: 655f923554403a4e45326e72            
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Usuario creado exitosamente.
 *         content:
 *          application/json:
 *            example:
 *              message: exito en la creacion del usuario.
 *       '400':
 *         description: Error en la solicitud o datos inválidos.       
 *         content:
 *          application/json:
 *            example:
 *              message: falla en creacion del usuario.
 * 
 * /api/users/{id}:
 *   get: 
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Trae un usuario especificado por id
 *     tags:
 *       - Users
 *     parameters:
 *      - in: path 
 *        name: id         
 *        schema:
 *         type: string
 *        required: true
 *        description: ID del usuario
 *     responses:
 *       '201':
 *         description: Exito en la busqueda del usuario.
 *         content:
 *          application/json:
 *            example:
 *              message: Exito en la busqueda del usuario.
 *       '400':
 *         description: Error en la busqueda del usuario.
 *         content:
 *          application/json:
 *            example:
 *              message: Error en la busqueda del usuario.
 *       
 *   put:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Actualizar usuario.
 *     description: agregar el campo a actualizar o el un campo nuevo para agregar
 *     tags:
 *       - Users
 *     parameters:
 *      - in: path 
 *        name: id         
 *        schema:
 *         type: string
 *        required: true
 *        description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:              
 *              englishLevel: C1
 *              knowledge: java
 *              linkCv: https://www.cvwizard.com/es?gad=1&gclid=CjwKCAiAx_GqBhBQEiwAlDNAZv4fxxpVUJibhlP7Bk7OaJ_8dONU532H-gfbWZu69EtvWXPapLzsehoCtKYQAvD_BwE
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Usuario actualizado exitosamente.
 *         content:
 *          application/json:
 *            example:
 *              message: Exito actualizando los datos.
 *       '400':
 *         description: Error en la solicitud o datos inválidos.
 *         content:
 *          application/json:
 *            example:
 *              message: Error al actualizar los datos.
 *       
 *   delete:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Elimina un usuario
 *     description: Elimina un usuario en el sistema.
 *     tags:
 *       - Users
 *     parameters:
 *      - in: path 
 *        name: id         
 *        schema:
 *         type: string
 *        required: true
 *        description: ID del usuario     
 *     schema:
 *        $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Usuario eliminado.
 *         content:
 *          application/json:
 *            example:
 *              message: Exito eliminando los datos.
 *       '400':
 *         description: Error al elmininar usuario.
 *         content:
 *          application/json:
 *            example:
 *              message: Error al eliminar los datos.
 *
 */
routes.use(routesUser);

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Operaciones relacionadas con cuentas.
 *
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         accountName:
 *           type: string
 *           description: Nombre de la cuenta.
 *         clientName:
 *           type: string
 *           description: nombre del cliente.
 *         oprationResponsible:
 *           type: string
 *           description: responsable de operacion.         
 *       required:
 *         - accountName
 *         - clientName
 *         - operationResponsible
 * 
 * /api/accounts:
 *    get:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Trae una lista de usuarios.
 *     description: Trae una lista de usuarios
 *     tags:
 *       - Accounts
 *     schema:
 *      $ref: '#/components/schemas/Account'  
 *     responses:
 *       '200':
 *         description: la lista de cuentas.
 *         content:
 *          application/json:
 *            example:
 *              message: exito trayendo las lista de cuentas.
 *       '400':
 *         description: la lista de cuentas.       
 *         content:
 *          application/json:
 *            example:
 *              message: error buscando la lista de cuentas.
 *    
 *    post:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Crea una nueva cuenta.
 *     description: Crea una nueva cuenta en el sistema.
 *     tags:
 *       - Accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               accountName: proyecto1
 *               clientName: arkus
 *               operationResponsible: sara restrepo
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       '200':
 *         description: Cuenta creada exitosamente.
 *         content:
 *          application/json:
 *            example:
 *              message: exito registrando la cuenta.
 *       '400':
 *         description: Error en la creacion de la cuenta.       
 *         content:
 *          application/json:
 *            example:
 *              message: Error al registrar de la cuenta.
 * 
 * /api/accounts/{id}:
 *   get:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Trae una cuenta especificada por id
 *     tags:
 *       - Accounts   
 *     parameters:
 *      - in: path 
 *        name: id         
 *        schema:
 *         type: string
 *        required: true
 *        description: ID de la cuenta
 *     schema:
 *       $ref: '#/components/schemas/Account'
 *     responses:
 *       '201':
 *         description: Exito buscando la informacion de la cuenta.
 *         content:
 *          application/json:
 *            example:
 *              message: Exito en la busqueda de la informacion de la cuenta.
 *       '400':
 *         description: Error al buscar la informacion de la cuenta.
 *         content:
 *          application/json:
 *            example:
 *              message: Error al buscar la informacion de la cuenta.
 *       
 *   put:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Actualizar cuenta.
 *     description: Actualiza una cuenta por id.
 *     tags:
 *       - Accounts
 *     parameters:
 *      - in: path 
 *        name: id         
 *        schema:
 *         type: string
 *        required: true
 *        description: ID de la cuenta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               accountName: proyectoUpdate
 *               clientName: ficosa
 *               operationResponsible: jose pulgarin
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       '200':
 *         description: Cuenta actualizada exitosamente.
 *         content:
 *          application/json:
 *            example:
 *              message: Exito actualizando la cuenta.
 *       '400':
 *         description: Error en la actualizacion de la cuenta.
 *         content:
 *          application/json:
 *            example:
 *              message: Error en la actualizacion de la cuenta.
 *       
 *   delete:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Elimina una cuenta.
 *     description: Elimina una cuenta del sistema.
 *     tags:
 *       - Accounts     
 *     parameters:
 *      - in: path 
 *        name: id         
 *        schema:
 *         type: string
 *        required: true
 *        description: ID del cuenta
 *     schema:
 *       $ref: '#/components/schemas/Account'
 *     responses:
 *       '201':
 *         description: Cuenta eliminada.
 *         content:
 *          application/json:
 *            example:
 *              message: Exito en la eliminacion de la cuenta.
 *       '400':
 *         description: Error en la eliminacion de la cuenta.
 *         content:
 *          application/json:
 *            example:
 *              message: Error en la eliminacion de la cuenta. 
 * 
 */
routes.use(routesAccount);

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Operaciones relacionadas con equipos.
 *
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del equipo.
 *         members:
 *           type: array
 *           items: 
 *             type: string
 *           description: Miembros del equipo.                  
 *       required:
 *         - name
 *         - members
 * 
 * /api/team:
 *   get:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: trae una lista de los equipos.
 *     desciption: 
 *     tags:
 *       - Teams      
 *     schema: 
 *       $ref: '#/components/schemas/Team'
 *     responses:
 *       '200':
 *         description: exito buscando los equipos.
 *         content:
 *          application/json:
 *            example:
 *              message: exito buscando los equipos.
 *       '400':
 *         description: error buscando los equipos.       
 *         content:
 *          application/json:
 *            example:
 *              message: error buscando los equipos.
 *   post:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Crea un nuevo equipo.
 *     description: Crea un nuevo equipo en el sistema donde los miembros son un array de IDs.
 *     tags:
 *       - Teams
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               name: equipo 3
 *               members: ["6553a3e119b5647ae6306d5c","6553a44419b5647ae6306d60"]               
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       '200':
 *         description: equipo creado exitosamente.
 *         content:
 *          application/json:
 *            example:
 *              message: exito en la creacion del equipo.
 *       '400':
 *         description: Error creacion del equipo.       
 *         content:
 *          application/json:
 *            example:
 *              message: falla en la creacion del equipo.
 * 
 * /api/team/{id}:
 *   get:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Trae un usuario especificado por id
 *     tags:
 *       - Teams     
 *     parameters:
 *      - in: path 
 *        name: id         
 *        schema:
 *         type: string
 *        required: true
 *        description: ID del equipo
 *     schema:
 *       $ref: '#/components/schemas/Team'
 *     responses:
 *       '201':
 *         description: Exito en la busqueda del del equipo.
 *         content:
 *          application/json:
 *            example:
 *              message: Exito en la busqueda del equipo.
 *       '400':
 *         description: Error en la busqueda del equipo.
 *         content:
 *          application/json:
 *            example:
 *              message: Error en la busqueda del equipo.
 *       
 *   put:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Actualizar equipo.
 *     description: Solo actualiza el nombre de un equipo.
 *     tags:
 *       - Teams
 *     parameters:
 *      - in: path 
 *        name: id         
 *        schema:
 *         type: string
 *        required: true
 *        description: ID del equipo 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               name: equipo update                
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       '200':
 *         description: Equipo actualizado exitosamente.
 *         content:
 *          application/json:
 *            example:
 *              message: Exito actualizando los datos.
 *       '400':
 *         description: Error actualizando los datos.
 *         content:
 *          application/json:
 *            example:
 *              message: Error actualizando los datos.
 *       
 *   delete:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Elimina un equipo.
 *     description: Elimina un equipo en el sistema.
 *     tags:
 *       - Teams
 *     parameters:
 *      - in: path 
 *        name: id         
 *        schema:
 *         type: string
 *        required: true
 *        description: ID del equipo
 *     schema:
 *       $ref: '#/components/schemas/Team'
 *     responses:
 *       '201':
 *         description: Equipo eliminado.
 *         content:
 *          application/json:
 *            example:
 *              message: Exito eliminando el equipo.
 *       '400':
 *         description: Error al elmininar el equipo.
 *         content:
 *          application/json:
 *            example:
 *              message: Error al eliminar el equipo.
 */
routes.use(routesTeam);

/**
 * @swagger
 * tags:
 *   name: TeamMoves
 *   description: Operaciones relacionadas con movimiento de equipo.
 *
 * components:
 *   schemas:
 *     TeamMove:
 *       type: object
 *       properties:
 *         idNewTeam:
 *           type: string
 *           description: ID del equipo al que ingresara el usuario.
 *         idOldTeam:
 *           type: string
 *           description: ID del equipo del que saldra el usuario.   
 *         idUser:
 *           type: string
 *           description: ID del usuario que se va a mover.
 *         nameNewTeam:
 *           type: string
 *           description: Nombre del equipo nuevo al que va a ingresar el usuario.
 *         nameOldTeam:
 *           type: string
 *           description: Nombre del equipo viejo del que saldra el usuario.
 *         userName:
 *           type: string
 *           description: Nombre del usuario con el que se va a realizar el movimiento.
 *         eventDate:
 *           type: string
 *           description: Fecha en la que se realizo el movimiento.
 *       required:
 *         - idNewTeam
 *         - idUser
 *         - nameNewTeam
 *         - userName
 *         - eventDate
 * 
 * /api/teamMoveList:
 *   get:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Trae la lista de movimientos.
 *     description: Trae la lista de movimientos.
 *     tags:
 *      - TeamMoves
 *     schema:
 *       $ref: #/components/schemas/TeamMove
 *     responses:
 *       '200':
 *         description: Error .
 *         content:
 *          application/json:
 *            example:
 *              message:exito buscando la lista de movimientos.
 *       '400':
 *         description: Error al traer lista de movimientos.
 *         content:
 *          application/json:
 *            example:
 *              message: Error buscando la lista de movimientos.
 * 
 * /api/teamMove:
 *   post:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Crea un movimineto de equipo.
 *     description: Registra un movimiento de equipo en el sistema.
 *     tags:
 *      - TeamMoves
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:   
 *             example:
 *               idOldTeam: 
 *               idNewTeam: 6553d8fd3763420fd915ed4b
 *               idUser: 6553a3e119b5647ae6306d5c         
 *             $ref: '#/components/schemas/TeamMove'
 *     responses:
 *       '200':
 *         description: Crear movimiento de equipo.
 *         content:
 *          application/json:
 *            example:
 *              message: Exito guardando el movimiento del equipo.
 *       '400':
 *         description: Error en movimiento de equipo.
 *         content:
 *          application/json:
 *            example:
 *              message: Error guardando el movimiento de equipo.
 * 
 *   get:
 *     security: #ingreso de token de autorizacion
 *       - bearerAuth: []
 *     summary: Trae un movimineto de equipo.
 *     description: Trae un movimiento especifico.
 *     parameters:
 *      - in: query 
 *        name: idUser         
 *        schema:
 *         type: string        
 *        description: ID del usuario
 *      - in: query 
 *        name: userName      
 *        schema:
 *         type: string        
 *        description: nombre del usuario
 *      - in: query
 *        name: nameNewTeam
 *        schema:
 *          type: string
 *        description: nombre del nuevo equipo al que ingresara el usuario
 *      - in: query
 *        name: eventDate
 *        schema:
 *          type: string
 *        description: fecha de cuando sucedio el evento
 *     tags:
 *      - TeamMoves     
 *     schema:
 *        $ref: '#/components/schemas/TeamMove'
 *     responses:
 *       '200':
 *         description: Traer movimiento de equipo.
 *         content:
 *          application/json:
 *            example:
 *              message: Movimientos encontrados.
 *       '400':
 *         description: Error al traer movimiento de equipo.
 *         content:
 *          application/json:
 *            example:
 *              message: Movimientos no encontrados.
 *       '404':
 *         description: Error al traer movimiento de equipo.
 *         content:
 *          application/json:
 *            example:
 *              message: Error trayendo el movimiento.
 */
routes.use(routesTeamMove)

export { routes };
