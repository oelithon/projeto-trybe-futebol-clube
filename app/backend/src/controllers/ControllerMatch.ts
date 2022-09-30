import { Request, Response } from 'express';
import ServiceMatch from '../service/ServiceMatches';

export default class ControllerMatch {
  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await ServiceMatch.getAllMatches(inProgress as string);

    return res.status(200).json(matches);
  }
}
