import { request } from "express";
import { TeamService } from "../services/TeamService.js";

export class TeamControl {
  constructor() {}
  async SignupTeam(request, response) {
    try {
      let teamService = new TeamService();
      let data = request.body;

      let team = await teamService.SignupTeam(data);
      response.status(200).json({
        mensaje: "exito registrando el team",
        data: team,
      });
    } catch (error) {
      console.error(error);
      response.status(400).json({
        message: "fallo en el registro del team: "+error.message,
        data: null,
      });
    }
  }
  async DeleteTeam(request, response) {
    try {
      let teamService = new TeamService();
      let id = request.params.id;
      let teamdelete = await teamService.DeleteTeam(id);
      response.status(200).json({
        message: "exito eliminando el equipo",
        data: teamdelete,
      });
    } catch (error) {
      console.error("Error borrando el team:", error);
      response.status(400).json({
        message: "error eliminando el equipo",
        data: null,
      });
    }
  }
  async UpdateTeam(request, response) {
    try {
      let teamService = new TeamService();
      let id = request.params.id;
      let data = request.body;      
      let updateTeam = await teamService.UpdateTeam(id, data);      
      response.status(200).json({
        message: "exito actualizando los datos",
        data: updateTeam,
      });
    } catch (error) {
      console.log(error);
      response.status(200).json({
        message: "error actualizando los datos",
        data: null,
      });
    }
  }
  async SearchTeams(request, response) {
    try {
      let teamService = new TeamService();
      let team = await teamService.SearchTeams();
      response.status(200).json({
        message: "exito buscando los equipos",
        teamData: team,
      });
    } catch (error) {
      response.status(400).json({
        message: "error buscando los equipos",
        teamData: null,
      });
    }
  }
  //funcion inhabilitada
  async SearchTeam(request, response) {
    try {
      let teamService = new TeamService();
      let id = request.params.id;   
      let team = await teamService.SearchTeam(id)         
      response.status(200).json({
        message: "exito buscando el equipo",
        team: team,
      });
    } catch (error) {
      response.status(400).json({
        message: "error buscando el equipo",
        team: null,
      });
    }
  }
  async ShowMembers(request, response) {
    try {
      let teamService = new TeamService();
      let id = request.params.id;
      //let data = request.body
      let team = await teamService.ShowMembers(id);
      response.status(200).json({
        message: "exito buscando le equipo",
        members: team,
      });
    } catch (error) {
      response.status(400).json({
        message: "fallo mostrando el equipo",
        members: null,
      });
    }
  }
  async SaveTeamMove(request, response) {
    try {
      let teamService = new TeamService();
      let id = request.params.id;
      let data = request.body;
      response.status(200).json({
        message: "exito guardando el movimiento del equipo",
        teams: await teamService.TeamMove(data),
      });
    } catch (error) {
      console.log(error);
      response.status(400).json({
        message: "error guardando el movimiento del equipo: "+ error.message,       
      });
    }
  }
  async ShowTeamMove(request, response) {
    try {
      let teamM = new TeamService();
      let data = request.query;
      //console.log("data:", data);
      let moveFound = await teamM.ShowTeamMove(data);
      console.log("Movimientos encontrados:", moveFound);
      if (moveFound && moveFound.length > 0) {
        response.status(200).json({
          message: `Movimientos encontrados`,
          movesfound: moveFound,
        });
      } else {
        response.status(400).json({
          message: "Movimientos no encontrados",
        });
      }
    } catch (error) {
      console.log(error);
      response.status(404).json({
        message: "error trayendo el movimiento"+error.message,
      });
    }
  }
  async showTeamMoveList(request, response){
    try {
      let teamService = new TeamService();
      let team = await teamService.ShowTeamMoveList();
      response.status(200).json({
        message: "exito buscando la lista de movimientos",
        teamData: team,
      });
    } catch (error) {
      response.status(400).json({
        message: "error buscando la lista de movimientos",
        teamData: null,
      });
    }
  }
}
