// import chai from 'chai';
// const { expect } = chai;
// import { BaseTest } from './index.spec.js';
//
// describe('Test the questions feature', function () {
//   let questionId;
//   beforeEach(async function () {
//     const createdQuestion = {
//       title: 'Aretha',
//       description: 'who is aretha',
//     };
//
//     const newQuestion = await BaseTest.post('questions').send(createdQuestion);
//     questionId = newQuestion.body.question.id;
//   });
//
//   it('Should get all questions', async () => {
//     const response = await BaseTest.get('questions').send({});
//     expect(response.status).to.equal(200);
//     expect(response.body).to.be.an('array');
//   });
//
//   it('Should get one question with an id', async () => {
//     const response = await BaseTest.get(`questions/${questionId}`).send({});
//     expect(response.status).to.equal(200);
//     expect(response.body.question.title).to.equal('Aretha');
//     expect(response.body.question.id).to.equal(questionId);
//   });
//
//   it('Should return an error message when an invalid id is passed', async () => {
//     const response = await BaseTest.get(`questions/invalid_id`).send({});
//     expect(response.status).to.equal(400);
//     expect(response.body.error).to.equal(
//       'question does not exist please check id'
//     );
//   });
//
//   it('Should update a question', async () => {
//     const response = await BaseTest.put(`questions/${questionId}`).send({
//       title: 'how hard is programming',
//       description: 'give a detailed answer',
//     });
//     expect(response.status).to.equal(201);
//   });
//
//   it('Should return an error if the question does not exist on update', async () => {
//     const response = await BaseTest.put(`questions/asadhga`).send({
//       title: 'how hard is programming',
//       description: 'give a detailed answer',
//     });
//     expect(response.status).to.equal(400);
//   });
//
//   it('Should not update question if title and description do not exist', async () => {
//     const response = await BaseTest.put(`questions/${questionId}`).send({});
//     expect(response.status).to.equal(201);
//   });
//
//   it('Should create a question', async () => {
//     const response = await BaseTest.post('questions').send({
//       title: 'create question 3',
//       description: 'answer to qn 3',
//     });
//     expect(response.status).to.equal(201);
//     expect(response.body).to.include({
//       message: 'the question has been created',
//     });
//   });
//
//   it('Should delete a user', async () => {
//     const response = await BaseTest.delete(`questions/${questionId}`);
//     expect(response.status).to.equal(204);
//   });
//
//   it('Should create an answer', async () => {
//     const response = await BaseTest.post(
//       `questions/${questionId}/answers`
//     ).send({
//       answer: ' this is answer to qn 5',
//     });
//     expect(response.status).to.equal(201);
//     expect(response.body).to.include({ message: 'Answer has been created' });
//   });
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
// });
