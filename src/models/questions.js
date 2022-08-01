import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
  user_id: String,
});

let QuestionModel = mongoose.model('Question', questionSchema);
export default QuestionModel;
