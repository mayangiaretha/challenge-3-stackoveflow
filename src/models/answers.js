import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  questionId: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: false,
  },
  answer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: false,
  },
  updatedAt: {
    type: String,
    required: false,
  },
});

let AnswerModel = mongoose.model('Answer', AnswerSchema);
export default AnswerModel;
