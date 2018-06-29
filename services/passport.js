const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')

const User = mongoose.model('User')
passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User
    .findById(id)
    .then(user => {
      done(null, user)
    })
    .catch(err => {
      console.log(err)
      done(err, null)
    })
})

const keys = require('../config/keys')

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })
      if (existingUser) {
        done(null, existingUser)
      } else {
        const newUser = await new User({ googleId: profile.id }).save()
        done(null, newUser)
      }
    }
  )
)