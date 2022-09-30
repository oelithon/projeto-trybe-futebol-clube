import * as express from 'express';

import validateLogin from '../middlewares/validateLogin';
import ControllerTeams from '../controllers/ControllerTeams';

export default class RouteTeams {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/teams/:id')
      .get(
        validateLogin.verifyToken,
        ControllerTeams.getOneTeam,
      );

    this.router
      .route('/teams')
      .get(
        validateLogin.verifyToken,
        ControllerTeams.getAllTeams,
      );
  }
}
