import { Request, Response } from 'express';
import Token from '../utils/jwtAuthenticator';

export default class ControllerLogin {
  static async successLogin(req: Request, res: Response) {
    const { email } = req.body;

    const token = await Token.createToken(email);

    return res.status(200).json({ token });
  }
}
