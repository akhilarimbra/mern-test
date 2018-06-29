const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  credits: {
    type: Number,
    default: 0,
    required: true
  }
})

mongoose.model('User', userSchema)
