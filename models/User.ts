import mongoose, {Schema} from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  created: Date,
  badges: [String],
  points: Number,
  currency: Number,
  done: [Object]
})

export default mongoose.models.User || mongoose.model('User', UserSchema);