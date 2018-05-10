import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Memo = new Schema({
  author: String,
  contents: String,
  favorites: [String],
  date: {
    created: { type: Date, default: Date.now },
    edited: { type: Date, default: Date.now }
  },
  isEdited: { type: Boolean, default: false }
})

export default mongoose.model('memo', Memo)
