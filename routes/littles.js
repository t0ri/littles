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
        console.log(req.body)
        User.authenticate(req.body.username, req.body.password, (err, user) => {
            if (err) {
                const next_error = new Error("Username or password incorrect");
                next_error.status = 401;

                return next(next_error);
            } else if(!user) {
                console.log('user not found')
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
        User.findById(req.session.userId)
            .then(littles => {
                res.render('littles-index', {
                    littles: littles,
                });
            })
            .catch(err => {
                console.log(err);
            })
    })

    app.get('/littles', (req, res, next) => {
        User.findById(req.session.userId)
            .populate('posts')
            .then( (user) => {
                res.render('littles-index', {
                    littles: user.posts,
                })
            })
    })


    // New
    app.get('/littles/new', (req, res, next) => {
        res.render('littles-new', {});
    })

    // Creates a new post for logged in user:
    app.post('/littles', (req, res, next) => {
        Little.create(req.body)
            .then(function(little) {
                User.findById(req.session.userId)
                    .then(function(user) {
                        // push new post into users.posts array from model:
                        user.posts.push(little._id);
                        user.save();
                        return res.redirect('/');
                    })
            })
            .catch(function(err) {
                return console.log(err);
            })
    });



    // EDIT
    app.get('/littles/:id/edit', (req, res) => {
        Little.findById(req.params.id, function(err, project) {
            res.render('littles-edit', {
                little: little
            });
        })
    })

    // UPDATE
    app.put('/littles/:id', (req, res) => {
        Little.findByIdAndUpdate(req.params.id, req.body)
            .then(little => {
                res.redirect(`/littles/${little._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    // DELETE
    app.delete('/littles/:id', function(req, res) {
        Little.findByIdAndRemove(req.params.id).then((little) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })

}
