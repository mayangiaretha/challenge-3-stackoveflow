import chai from 'chai';
const { expect } = chai;
import mongoose from 'mongoose';
import { BaseTest } from './index.spec.js';
import usersModel from '../models/users';
import QuestionModel from '../models/questions';

describe('Test the questions feature', function () {
  let token;
  let questionId;
  let createdAnswer;

  beforeEach(async function() {
    const res = await BaseTest.post('/users/register').send({
      firstName: 'Aretha',
      lastName: 'mayangi',
      email: 'myaretha@gmail.com',
      password: 'password',
    });

    const response = await BaseTest.post('/users/login').send({
      email: 'myaretha@gmail.com',
      password: 'password',
    });

    token = response.body.token;

    const createQuestion = await BaseTest.post('questions')
      .set('access-token', `${token}`)
      .send({
        title: 'Question is true',
        description: 'This is a question for deleting',
      });
    questionId = createQuestion.body.question.questionId;

    const newAnswer = await BaseTest.post(`questions/${questionId}/answers`)
      .set('access-token', `${token}`)
      .send({ answer: 'answer for question 2 challenge-3'});
    console.log(newAnswer.body,'===========>')


    createdAnswer = newAnswer.body.answer;
  });



  afterEach(async function () {
    await usersModel.deleteMany({});
    await QuestionModel.deleteMany({});
  });

  it('Should get all questions', async () => {
    const response = await BaseTest.get('questions');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('Should get a question with an id', async () => {
    const response = await BaseTest.get(`questions/${questionId}`);
    expect(response.status).to.equal(200);
    expect(response.body.question.title).to.equal('Question is true');
    expect(response.body.question.questionId).to.equal(questionId);
  });

  it('Should create a question', async () => {
    const response = await BaseTest.post('questions')
      .set('access-token', `${token}`)
      .send({
        title: 'create question please',
        description: 'you must be logged in to create a qn',
      });
    expect(response.status).to.equal(201);
    expect(response.body).to.include({
      message: 'question created',
    });
  });

  it('Should update a question', async () => {
    const response = await BaseTest.put(`questions/${questionId}`)
      .set('access-token', `${token}`)
      .send({
        title: 'how hard is programming',
        description: 'give a detailed answer',
      });
    expect(response.status).to.equal(201);
  });

  it('Should return an error if question does not exist', async () => {
    const response = await BaseTest.delete(`questions/jdfghskjd`)
      .set('access-token', `${token}`)
      .send({});
    expect(response.status).to.equal(400);
  });

    it('Should return an error message when an invalid id is passed', async () => {
      const response = await BaseTest.get(`questions/invalid_id`).send({});
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal(
        'question does not exist please check id'
      );
    });

    it('Should create an answer', async () => {
      const response = await BaseTest.post(
        `questions/${questionId}/answers`
      ).set('access-token', `${token}`)
        .send({
        answer: ' this is answer to qn 5',
      });
      expect(response.status).to.equal(201);
      expect(response.body).to.include({ message: 'Answer has been created' });
    });

  it('Should get all answers', async () => {
    const response = await BaseTest.get(`questions/${questionId}/answers`);
    console.log(response.body,'this is an answer=======>')
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
  //   it('Should get an answer to a question', async () => {
  //     const response = await BaseTest.get(
  //       `questions/3d104a9f-bb18-4ded-a1b5-68b62f15de0a/answers`
  //     );
  //     expect(response.status).to.equal(200);
  //     expect(response.body[0].questionId).to.equal(
  //       '3d104a9f-bb18-4ded-a1b5-68b62f15de0a'
  //     );
  //   });
  //
  //   it('Should get an error if we try  to get an answer to a question without an answer', async () => {
  //     const response = await BaseTest.get(`questions/sdkfjdsk/answers`);
  //
  //     expect(response.status).to.equal(400);
  //     expect(response.body.message).to.equal(
  //       'Answer to this question does not exist'
  //     );
  //   });
  //
  //   it('Should fail to create an answer if an invalid id is provided', async () => {
  //     const response = await BaseTest.post(`questions/zzzzz/answers`).send({
  //       answer: ' this is answer to qn 5',
  //     });
  //     expect(response.status).to.equal(400);
  //     expect(response.body).to.include({
  //       error: 'question does not exist please check id',
  //     });
  //   });
});
