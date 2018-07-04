const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const RecipientSchema = require('./Recipient')

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: {
    type: Number,
    default: 0
  },
  no: {
    type: Number,
    default: 0
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  dateSent: Date,
  lastResponded: Date
})

mongoose.model('Survey', surveySchema)

/*
Survey.updateOne({
  id: surveyId,
  recipients: {
    $elemMatch: { email, responded: false }
  }
}, {
  $inc: { [choice]: 1 },
  $set: { 'recipients.$.responded': true }
})
*/
