import mongoose, {Schema} from 'mongoose'

const QuizSchema = new mongoose.Schema({
  question: String,
  answer: String,
  category: String,
  options: [Object],
  date: Date
})

export default mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);