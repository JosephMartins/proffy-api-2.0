import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import CredentialsController from './controllers/CredentialsController';
import SessionController from './controllers/SessionsController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const credentialsContoller = new CredentialsController();
const sessionsController = new SessionController();

routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);


routes.post('/credentials', credentialsContoller.create);
routes.get('/credentials/:page', credentialsContoller.index);

routes.post('/sessions', sessionsController.create);


routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);


export default routes;