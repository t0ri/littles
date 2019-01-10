const express = require('express');
const router = express.Router();

const Little = require('../models/little');
const User = require('../models/user');


module.exports = (app) => {

    app.use(function(req, res, next) {
        res.locals.currentUserId = req.session.userId;

        next();
    });

    // login
    app.get('/login', (req, res, next) => {
        res.render('login');
    });

    // POST login
    app.post('/login', (req, res, next) => {
        User.authenticate(req.body.username, req.body.password, (err, user) => {
            if (err || !user) {
                const next_error = new Error("Username or password incorrect");
                next_error.status = 401;

                return next(next_error);
            } else {
                req.session.userId = user._id;

                return res.redirect('/');
            }
        });
    });

    // Logout
    app.get('/logout', (req, res, next) => {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) return next(err);
            });
        }

        return res.redirect('/login');
    });

    // Index
    app.get('/', (req, res, next) => {
        const currentUserId = req.session.userId;

        Little.find({})
            .then(littles => {
                res.render('littles-index', {
                    littles: littles,
                });
            })
            .catch(err => {
                console.log(err);
            })
    })


    // New
    app.get('/littles/new', (req, res, next) => {
        res.render('littles-new', {});
    })

    // Create
    app.post('/littles', (req, res, next) => {
        Little.create(req.body).then((littles) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })

}
