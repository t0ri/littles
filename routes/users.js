const express = require('express');
const router = express.Router();

const User = require('../models/user');

module.exports = (app) => {

    //Users index
    app.get('/users', (req, res, next) => {
        User.find({}, 'username', function(err, users) {
            if (err) {
                console.error(err);
            } else {
                res.render('users/index', {
                    users: users
                });
            }
        });
    });

    // Users new
    app.get('/users/new', (req, res, next) => {
        res.render('users/new');
    })

    // Users create
    app.post('/users', (req, res, next) => {
        var user = new User(req.body);

        user.save(function(err, user) {
            if (err) {
                console.log(err)
            } else {
                res.redirect('/users');
            }});
    })

}
