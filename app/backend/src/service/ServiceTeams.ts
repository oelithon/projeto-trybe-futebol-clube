import ModelTeam from '../database/models/ModelTeam';

export default class ServiceTeams {
  static async getAllTeams() {
    const teams = ModelTeam.findAll();

    return teams;
  }

  static async getOneTeam(id: number) {
    const team = ModelTeam.findByPk(id);

    return team;
  }
}
