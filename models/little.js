const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Little = mongoose.model('Little', {
    type: Boolean,
    title: String,
    desc: String,

    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = Little
