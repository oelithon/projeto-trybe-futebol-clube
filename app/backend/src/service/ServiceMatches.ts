import { IMatches } from '../interfaces/InterfaceUser';
import ModelMatch from '../database/models/ModelMatch';
import ModelTeam from '../database/models/ModelTeam';

const includeModel = [
  { model: ModelTeam, as: 'teamHome', attributes: { exclude: ['id'] } },
  { model: ModelTeam, as: 'teamAway', attributes: { exclude: ['id'] } },
];

export default class ServiceMatch {
  static async getAllMatches(inProgress: string) {
    if (!inProgress) {
      const matches = await ModelMatch.findAll(
        {
          attributes: { exclude: ['home_team', 'away_team'] },
          include: includeModel,
        },
      );

      return matches;
    }

    const bool = JSON.parse(inProgress);
    const matchesFiltered = await ModelMatch.findAll({
      where: { inProgress: bool },
      attributes: { exclude: ['home_team', 'away_team'] },
      include: includeModel,
    });
    return matchesFiltered;
  }

  static async createMatch(body: IMatches) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;

    const created = await ModelMatch.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    });
    return created;
  }

  static async finishMatch(id: number) {
    const finishMatch = await ModelMatch.update(
      { inProgress: false },
      { where: { id } },
    );

    return finishMatch;
  }

  static async updateMatch(id: number, homeTeamGoals: string, awayTeamGoals: string) {
    const matchUpdated = await ModelMatch.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    return matchUpdated;
  }
}
