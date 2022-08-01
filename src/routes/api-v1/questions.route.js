import { Router } from 'express';
import QuestionsController from '../../controllers/questions';
import { celebrate, Joi, Segments } from 'celebrate';
import verifyToken from '../../middleware/auth';

const router = Router();

router.get('/', QuestionsController.getAllQuestions);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().min(10).max(50),
      description: Joi.string().required().min(10).max(3000),
    }),
  }),
  verifyToken,
  QuestionsController.createAQuestion
);

router.get('/:id', QuestionsController.getAQuestion);

router.put(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
    }),
  }),

  QuestionsController.updateAQuestion
);

router.delete('/:id', QuestionsController.deleteAQuestion);

//Answers routes

//post an answer

router.post(
  '/:qnsId/answers',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      answer: Joi.string().min(10).required(),
    }),
  }),
  QuestionsController.createAnAnswer
);

// // Getting a specific answer
 router.get('/:qnsId/answers/', QuestionsController.getAllAnswers);

export default router;
