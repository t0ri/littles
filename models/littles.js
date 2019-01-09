const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Little = mongoose.model('Comment', {
  title: String,
  user: String,
  content: String,
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' }
});

module.exports = Little
