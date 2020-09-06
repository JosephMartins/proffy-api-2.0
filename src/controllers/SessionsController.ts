import { Request, Response } from 'express';
import db from '../database/connection';
import AppError from '../Errors/AppError';
import { sign } from 'jsonwebtoken';

export default class SessionsController{

  async create(request: Request, response: Response){
    const {email, password} = request.body;

      const credentials = await db.from('credentials')
      .where('email', '=', email)
      .first();

      if(!credentials){
        throw new AppError('E-mail don\'t already exists');
      }
      const token = sign({}, 'thderhgfdfghjfghj', {
        subject: String(credentials.id),
        expiresIn: '1d',
      })
      const credentialsToken = {
        user: {
          'Email': email,
          'Password': password 
        },
        token
      }
      return response.json(credentialsToken);
  } 
}

