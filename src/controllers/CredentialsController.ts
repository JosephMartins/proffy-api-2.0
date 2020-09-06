import { Request, Response } from 'express';
import db from '../database/connection';
import AppError from '../Errors/AppError';

export default class CredentialsController{

  async index(request: Request, response: Response){
    const { page } = request.params;

    try{
      const emailExists = await db.from('credentials')
      .limit(10)
      .offset(Number(page))

     
      return response.status(201).json(emailExists);
    }catch (err){

      return response.status(400).json({"Error": err});
    }
  } 



  async create(request: Request, response: Response){
    const {email, password} = request.body;

    try{
      const emailExists = await db.from('credentials')
      .where('email', '=', email)
      .first();

      if(emailExists){
          throw new AppError('E-mail is already exists');
      }
      
      await db('credentials').insert({
        email,
        password
      });

      const credentials = {'Email': email, 'Password': password}
        
      return response.status(201).json(credentials);
    }catch (err){

      return response.status(400).json({"Error": err});
    }
  } 
}

