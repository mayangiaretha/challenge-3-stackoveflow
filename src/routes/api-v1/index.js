import { Router } from 'express';
import questionsRoute from './questions.route';
import usersRoute from './users.route';

const routes = Router();

routes.use('/questions', questionsRoute);
routes.use('/users', usersRoute);

export default routes;
