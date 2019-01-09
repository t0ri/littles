const express = require('express');
const router = express.Router();

const Little = require('../models/little');

module.exports = (app) => {

    // Index
    app.get('/', (req, res) => {
        Little.find()
            .then(littles => {
                res.render('littles-index', {
                    littles: littles
                });
            })
            .catch(err => {
                console.log(err);
            })
    })

    // New
    app.get('/littles/new', (req, res) => {
        res.render('littles-new', {});
    })

    // Create
    app.post('/littles', (req, res) => {
        Little.create(req.body).then((littles) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })

}
