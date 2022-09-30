import { Request, Response } from 'express';
import ServiceMatch from '../service/ServiceMatches';

export default class ControllerMatch {
  static async getAllMatches(_req: Request, res: Response) {
    const matches = await ServiceMatch.getAllMatches();

    return res.status(200).json(matches);
  }
}
