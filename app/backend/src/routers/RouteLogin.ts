import * as express from 'express';
import { Request, Response } from 'express';
import ControllerLogin from '../controllers/ControllerLogin';
import validateLogin from '../middlewares/validateLogin';

export default class RouteLogin {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/login/validate')
      .get(
        validateLogin.verifyToken,
        ControllerLogin.roleUser,
      );

    this.router
      .route('/login')
      .post(
        validateLogin.email,
        validateLogin.password,
        ControllerLogin.successLogin,
      )
      .get((_req: Request, res: Response) => {
        res.status(200).json({ message: 'ok' });
      });
  }
}
