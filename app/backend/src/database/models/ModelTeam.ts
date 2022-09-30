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
  foreignKey: 'homeTeam',
});

Match.belongsTo(Team, {
  foreignKey: 'awayTeam',
});

export default Team;
