const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Little = mongoose.model('Little', {
    type: String,
    title: String,
    desc: String,
    status: String,

    user: {
        
    }

    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Little'
    }
});

module.exports = Little
