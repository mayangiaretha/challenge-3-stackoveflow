import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import usersController from '../../controllers/users';

const router = Router();

router.post(
  '/register',

  celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().min(2).max(15).required(),
      lastName: Joi.string().min(2).max(15).required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(6).max(20).required(),
    }),
  }),
  usersController.registerAUser
);

router.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  usersController.loginUser
);

export default router;
