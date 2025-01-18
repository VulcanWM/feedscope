import mongoose, {Schema} from 'mongoose'

const QuizSchema = new mongoose.Schema({
  title: String,
  desc: String,
  options: [Object],
  date: Date
})

export default mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);