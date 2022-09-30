import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './ModelMatch';

class Team extends Model {
  public id: number;

  public teamName: string;
}

Team.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  teamName: { allowNull: false, type: DataTypes.STRING },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  tableName: 'teams',
});

Match.belongsTo(Team, {
  foreignKey: 'home_team',
  as: 'teamHome',
});

Match.belongsTo(Team, {
  foreignKey: 'away_team',
  as: 'teamAway',
});

export default Team;
