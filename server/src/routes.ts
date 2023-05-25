import express from 'express';
import UserController from '@controllers/UserController'
import FilmesController from '@controllers/FilmesController';

const routes = express.Router();
const userController = new UserController();
const filmesController = new FilmesController();

routes.post('/user', userController.create);
routes.get('/user', userController.get);
routes.delete('/user/:id', userController.delete);
routes.put('/user/:id', userController.update);

routes.post('/filme', filmesController.create);
routes.get('/filme', filmesController.get);


export default routes;