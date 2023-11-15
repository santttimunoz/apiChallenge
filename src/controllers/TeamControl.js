import { TeamService } from "../services/TeamService.js";

export class TeamControl {
    constructor() {

    }
    async SignupTeam(request, response) {
        try {
            let teamService = new TeamService()
            let data = request.body
            let team = await teamService.SignupTeam(data)
            response.status(200).json({
                mensaje: 'exito registrando el team',
                data: team
            })

        } catch (error) {
            console.error(error)
            response.status(400).json({
                message: "fallo en el registro del team",
                data: null
            })
        }
    }
    async DeleteTeam(request, response) {
        try {
            let teamService = new TeamService()
            let id = request.params.id
            let teamdelete = await teamService.DeleteTeam(id)
            response.status(200).json({
                message: "exito eliminando el equipo",
                data: teamdelete
            })
        } catch (error) {
            console.error("Error borrando el team:", error)
            response.status(400).json({
                message: "error eliminando el equipo",
                data: null
            })
        }

    }
    async UpdateTeam(request, response) {
        try {
            let teamService = new TeamService()
            let id = request.params.id
            let data = request.body
            let updateTeam = await teamService.UpdateTeam(id, data, { new: true })
            response.status(200).json({
                message: "exito actualizando los datos",
                data: updateTeam
            })
        } catch (error) {
            console.log(error)
            response.status(200).json({
                message: "exito actualizando los datos",
                data: null
            })
        }

    }
    async SearchTeams(request, response) {
        try {
            let teamService = new TeamService()
            response.status(200).json({
                message: 'exito buscando los datos',
                teamData: await teamService.SearchTeams()
            })
        } catch (error) {
            response.status(400).json({
                message: "error buscando los teams",
                teamData: null
            })
        }
    }
    async ShowMembers(request, response) {
        try {
            let teamService = new TeamService()
            let id = request.params.id
            //let data = request.body
            let team = await teamService.ShowMembers(id)
            response.status(200).json({
                message: 'exito buscando los miembros del equipo',
                members: team
            })
        } catch (error) {
            response.status(400).json({
                message: 'fallo mostrando los miembros',
                members: null
            })
        }

    }
    async ShowTeamMove(request, response) {
        try {
            let teamService = new TeamService()
            response.status().json({
                message: "exito mostrando los movimientos de los equipos",
                teams: await teamService.ShowTeamMove()
            })
        } catch (error) {
            response.status().json({
                message: "error mostrando los movientos de los equipos"
            })
        }
    }
}