const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require("./config");
const chalk = require('chalk');

module.exports = function (passport) {
    passport.serializeUser((user, cb) => {
        cb(null, user);
    })

    passport.deserializeUser((user, cb) => {
        cb(null, user);
    })

    passport.use(new FacebookStrategy({
        clientID: keys.FACEBOOK.clientID,
        clientSecret: keys.FACEBOOK.clientSecret,
        callbackURL: '/facebook/callback'
    },
        (accessToken, refressToken, profile, cb) => {
            console.log(chalk.blue(JSON.stringify(profile)));
            return cb(null, profile);
        }))

}