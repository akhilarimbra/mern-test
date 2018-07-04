const mongoose = require('mongoose')
const _ = require('lodash')
const Path = require('path-parser').default
const { URL } = require('url')

const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/email_templates/survery')

const Survey = mongoose.model('Survey')

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    })
    const mailer = new Mailer(survey, surveyTemplate(survey))

    try {
      await mailer.send()
      await survey.save()
      req.user.credits -= 1
      const user = await req.user.save()
      res.send(user)
    } catch (err) {
      res.status(422).send(err)
    }
  })

  app.get('/api/surveys/:id/:choice', (req, res) => {
    res.send('Thanks for voting')
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    _.chain(req.body)
      .map(({ email, url }) => {
        const pathname = new URL(url).pathname
        const p = new Path('/api/surveys/:surveyId/:choice')
        const match = p.test(pathname)
        if (match) {
          const { surveyId, choice } = match

          return {
            email,
            surveyId,
            choice
          }
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ email, surveyId, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec()
      })
      .value()
  })

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find(
      { _user: req.user.id },
      (error, surveys) => {
        if (error) return res.send(error)
        console.log(surveys)
      }
    ).select({
      recipients: false
    })
    res.send(surveys)
  })
}
