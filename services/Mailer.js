const sendgrid = require('sendgrid')

const Helper = sendgrid.mail
const keys = require('../config/keys')

class Mailer extends Helper.Mail {
  constructor({ subject, recipients }, content) {
    super()

    this.from_email = new Helper.Email('no-reply@emaily.com')
    this.subject = subject
    this.body = new Helper.Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)

    this.addContent(this.body)
    this.addClickTracking()
    this.addRecipients()
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => new helper.Email(email))
  }

  addClickTracking() {
    const trackingSettings = new Helper.TrackingSettings()
    const clickTracking = new Helper.ClickTracking(true, true)

    trackingSettings.setClickTracking(clickTracking)
    this.addTrackingSettings(trackingSettings)
  }

  addRecipients() {
    const personalize = new Helper.Personalization()
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient)
    })
    this.addPersonalization(personalize)
  }
}

module.exports = Mailer
