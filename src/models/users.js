import moongose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('user', userSchema);
