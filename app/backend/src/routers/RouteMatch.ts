import * as express from 'express';

import validateLogin from '../middlewares/validateLogin';
import ControllerMatch from '../controllers/ControllerMatch';

export default class RouteTeams {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/matches')
      .get(
        ControllerMatch.getAllMatches,
      )
      .post(
        validateLogin.verifyToken,
        ControllerMatch.createMatch,
      );
  }
}
