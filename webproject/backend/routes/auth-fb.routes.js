//routes.js
const express = require('express')
const passport = require('passport')

const userModel = require('../models/users.schema');
const authFbRouter = express.Router();

authFbRouter.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

authFbRouter.get('/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    });

authFbRouter.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = authFbRouter;