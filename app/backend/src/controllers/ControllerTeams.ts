import { Request, Response } from 'express';
import ServiceTeams from '../service/ServiceTeams';

export default class ControllerTeams {
  static async getAllTeams(_req: Request, res: Response) {
    const teams = await ServiceTeams.getAllTeams();

    return res.status(200).json(teams);
  }

  static async getOneTeam(req: Request, res: Response) {
    const { id } = req.params;

    const team = await ServiceTeams.getOneTeam(Number(id));

    return res.status(200).json(team);
  }
}
