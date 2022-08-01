import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
  user_id: {
    type: String,
    required: false,
  },
});

let QuestionModel = mongoose.model('Question', questionSchema);
export default QuestionModel;
