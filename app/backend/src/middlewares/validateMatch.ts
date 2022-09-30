import { Request, Response, NextFunction } from 'express';
import ModelMatch from '../database/models/ModelMatch';
import UserToken from '../utils/jwtAuthenticator';

const errorDobleMatch = { message: 'It is not possible to create a match with two equal teams' };
const errorTeamNotFound = { message: 'There is no team with such id!' };
const errorTokenInvalid = { message: 'Token must be a valid token' };

export default class ValidateMatch {
  static async createMatch(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;

    const homeTeams = await ModelMatch.findByPk(homeTeam);
    const awayTeams = await ModelMatch.findByPk(awayTeam);

    if (homeTeam === awayTeam) {
      return res.status(401).json(errorDobleMatch);
    }

    if (!homeTeams) {
      return res.status(404).json(errorTeamNotFound);
    }

    if (!awayTeams) {
      return res.status(401).json(errorTeamNotFound);
    }

    next();
  }

  static async validateTokenMatch(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json(errorTokenInvalid);
    }

    const token = UserToken.verifyToken(authorization as string);

    if (!token) {
      return res.status(401).json(errorTokenInvalid);
    }

    next();
  }
}
