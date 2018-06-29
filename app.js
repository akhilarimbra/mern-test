const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')

const keys = require('./config/keys')

// mongoose models
require('./models/User')
require('./models/Survey')
mongoose.connect(keys.mongoUri)
require('./services/passport')

const app = express()

app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // set cookie lifespan to 30 days
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

// express route handlers
require('./routes/auth')(app)
require('./routes/billing')(app)
require('./routes/survey')(app)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server listening at PORT: ${PORT}`)
})
