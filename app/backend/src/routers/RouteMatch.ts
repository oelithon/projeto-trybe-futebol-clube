import * as express from 'express';

import ValidateMatch from '../middlewares/validateMatch';
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
        ValidateMatch.validateTokenMatch,
        ControllerMatch.createMatch,
      );

    this.router
      .route('/matches/:id')
      .patch(
        ControllerMatch.updateMatch,
      );

    this.router
      .route('/matches/:id/finish')
      .patch(ControllerMatch.finishMatch);
  }
}
