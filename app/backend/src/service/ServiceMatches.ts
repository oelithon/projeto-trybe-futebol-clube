import ModelMatch from '../database/models/ModelMatch';
import ModelTeam from '../database/models/ModelTeam';

export default class ServiceMatch {
  static async getAllMatches() {
    const matches = await ModelMatch.findAll(
      {
        attributes: { exclude: ['home_team', 'away_team'] },
        include: [
          { model: ModelTeam, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: ModelTeam, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      },
    );

    return matches;
  }
}
