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
        res.render('layouts/login');
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
            .populate('posts')
            .then( (user) => {
                let trueCount = 0;
                let falseCount = 0;
                for(let item of user.posts){
                    if (item.type == true){
                        trueCount++;
                    }else{
                        falseCount++;
                    }
                }
                let totalCount= trueCount+ falseCount;
                console.log(`trueCount is ${trueCount} \n falsecount is ${falseCount}`)
                console.log(user.posts[0]);
                res.render('littles-index', {
                    littles: user.posts,
                    trueCount,
                    falseCount,
                    totalCount
                })
            })
            .catch(err => {
                res.redirect('login')
            })
    })

    // New
    app.get('/littles/new', (req, res, next) => {
        res.render('littles-new', {});
    })


    app.get('/littles/:id', (req, res) => {
        Little.findById(req.params.id, function(err, littles) {
            res.render('littles-show', { littles : littles });
        })
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
        Little.findById(req.params.id, function(err, littles) {
            res.render('littles-edit', {
                littles: littles
            });
        })
    })

    // UPDATE
    app.put('/littles/:id', (req, res) => {
        Little.findByIdAndUpdate(req.params.id, req.body)
            .then(littles => {
                res.redirect(`/littles/${littles._id}`)
            })
            .catch(err => {
                console.log(err.message, req.params.id)
            })
    })

    // DELETE
    app.delete('/littles/:id', function(req, res) {
        console.log(req.params.id, "del")
        Little.findByIdAndRemove(req.params.id).then((littles) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })



}
