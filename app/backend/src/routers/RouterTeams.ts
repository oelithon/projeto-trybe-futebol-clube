import * as express from 'express';

import ControllerTeams from '../controllers/ControllerTeams';

export default class RouteTeams {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/teams')
      .get(ControllerTeams.getAllTeams);
  }
}
