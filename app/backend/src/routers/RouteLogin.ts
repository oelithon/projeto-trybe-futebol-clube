import * as express from 'express';
import { Request, Response } from 'express';
import validateLogin from '../middlewares/validateLogin';

export default class RouteLogin {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/login')
      .post(
        validateLogin.validateEmail,
        validateLogin.validatePassword,
      )
      .get((_req: Request, res: Response) => {
        res.status(200).json({ message: 'ok' });
      });
  }
}
