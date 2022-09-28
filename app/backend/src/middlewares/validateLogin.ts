import { Request, Response, NextFunction } from 'express';

const fieldsFilled = { message: 'All fields must be filled' };

export default class validateLogin {
  static async validateEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!email) return res.status(400).json(fieldsFilled);

    next();
  }
}
