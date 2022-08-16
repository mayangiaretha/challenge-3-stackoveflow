import QuestionModel from '../models/questions';
import AnswerModel from '../models/answers';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

class QuestionsController {
  static async getAllQuestions(req, res) {
    try {
      const allQuestions = await QuestionModel.find();
      return res.status(200).json(allQuestions);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getAQuestion(req, res) {
    try {
      const { id } = req.params;

      const foundQuestion = await QuestionModel.findOne({ questionId: id });

      if (!foundQuestion) {
        return res
          .status(400)
          .json({ error: 'question does not exist please check id' });
      }
      return res.json({ question: foundQuestion });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async createAQuestion(req, res) {
    try {
      const { title, description } = req.body;

      const createdQuestion = {
        questionId: uuidv4(),
        title,
        description,
        createdAt: dayjs().format('YYYY-MM-DD h:mm:ss A'),
      };
      await QuestionModel.create(createdQuestion);

      return res.status(201).json({
        question: createdQuestion,
        message: 'question created',
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async updateAQuestion(req, res) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      await QuestionModel.findOneAndUpdate(
        { questionId: id },
        {
          title,
          description,
          updatedAt: dayjs().format('YYYY-MM-DD h:mm:ss A'),
        }
      );

      const updatedQuestion = await QuestionModel.findOne({ questionId: id });

      return res
        .status(201)
        .json({ updatedQuestion, message: 'updated the question' });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async deleteAQuestion(req, res) {
    try {
      const { id } = req.params;

      const deletedQuestion = await QuestionModel.findOne({ questionId: id });
      if (!deletedQuestion) {
        return res.status(400).json({
          message: `The question does not exist`,
        });
      }
      await deletedQuestion.deleteOne();
      return res.status(204);
    } catch (error) {
      console.log(message.error);
    }
  }

  //post an answer

  static async createAnAnswer(req, res) {
    try {
      const { qnsId } = req.params;
      const { answer } = req.body;

      const foundQuestion = QuestionModel.findOne({ questionId: qnsId });
      if (!foundQuestion) {
        return res
          .status(400)
          .json({ error: 'question does not exist please check id' });
      }

      const createAnAnswer = {
        id: uuidv4(),
        questionId: qnsId,
        answer,
      };

      await AnswerModel.create(createAnAnswer);

      return res.status(201).json({
        answer: createAnAnswer,
        message: 'Answer has been created',
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getAllAnswers(req, res) {
    try {
      const { qnsId } = req.params;

      const foundAnswer = await AnswerModel.find({ questionId: qnsId });

      if (foundAnswer.length === 0) {
        return res
          .status(400)
          .json({ message: 'Answer to this question does not exist' });
      }
      return res.status(200).json(foundAnswer);
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default QuestionsController;
