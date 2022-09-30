import { Request, Response } from 'express';
import ServiceMatch from '../service/ServiceMatches';

export default class ControllerMatch {
  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await ServiceMatch.getAllMatches(inProgress as string);

    return res.status(200).json(matches);
  }

  static async createMatch(req: Request, res: Response) {
    const createMatch = await ServiceMatch.createMatch(req.body);

    return res.status(201).json(createMatch);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const finishMatch = await ServiceMatch.finishMatch(Number(id));

    if (finishMatch) {
      return res.status(200).json({ message: 'Finished' });
    }
  }

  static async updateMatch(req: Request, res: Response) {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;

    await ServiceMatch.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);

    return res.json({ message: 'updated' });
  }
}
