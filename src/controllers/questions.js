import QuestionsModel from '../models/questions';

import { v4 as uuidv4 } from 'uuid';

class QuestionsController {
  static async getAllQuestions(req, res) {
    try {
      const allQuestions = await Question.find();
      return res.status(200).json(allQuestions);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async createAQuestion(req, res) {
    try {
      const { title, description } = req.body;

      const createdQuestion = {
        id: uuidv4(),
        title,
        description,
      };
      Question.create(createdQuestion);

      return res.status(201).json({
        question: createdQuestion,
        message: 'question created',
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getAQuestion(req, res) {
    try {
      const { id } = req.params;

      const foundQuestion = Question.findById((Question) => Question.id === id);
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

  //
  //   static async upDated(req, res) {
  //     try {
  //       const { id } = req.params;
  //
  //       const { title, description } = req.body;
  //
  //       const updatedQuestion = Question.findOneAndUpdate((Question) => Question.id === id);
  //
  //       if (!updatedQuestion) {
  //         return res.status(400).json({ error: 'question does not exist ' });
  //       }
  //
  //       if (title) updatedQuestion.title = title;
  //
  //       if (description) updatedQuestion.description = description;
  //
  //       return res
  //         .status(201)
  //         .json({ updatedQuestion, message: 'updated the question' });
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //
  //   static deleteQuestion(req, res) {
  //     try {
  //       const { id } = req.params;
  //
  //       const deletedQuestion = questions.findIndex(
  //         (question) => question.id === id
  //       );
  //       if (!deletedQuestion) {
  //         return res.status(400).json({ message: 'Question not found' });
  //       }
  //       questions.splice(deletedQuestion, 1);
  //       return res.status(204).json({ message: 'question deleted ' });
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //   //post an answer
  //
  //   static createAnAnswer(req, res) {
  //     try {
  //       const { qnsId } = req.params;
  //       const { answer } = req.body;
  //
  //       const foundQuestion = questions.find((question) => question.id === qnsId);
  //       if (!foundQuestion) {
  //         return res
  //           .status(400)
  //           .json({ error: 'question does not exist please check id' });
  //       }
  //
  //       const createAnAnswer = {
  //         id: uuidv4(),
  //         questionId: qnsId,
  //         answer: answer,
  //       };
  //       answers.push(createAnAnswer);
  //
  //       return res.status(201).json({
  //         answer: createAnAnswer,
  //         message: 'Answer has been created',
  //       });
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //
  //   static getAnAnswer(req, res) {
  //     try {
  //       const { id } = req.params;
  //
  //       const foundAnswer = answers.filter((answer) => answer.questionId === id);
  //
  //       if (foundAnswer.length === 0) {
  //         return res
  //           .status(400)
  //           .json({ message: 'Answer to this question does not exist' });
  //       }
  //       return res.status(200).json(foundAnswer);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  // }
}
export default QuestionsController;
