export interface IUser {
  id: number;
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface IUserVerify {
  user: {
    id: number;
    username: string,
    role: string,
    email: string,
    password: string,
  };
}

export interface IMatches {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress?: boolean
}
