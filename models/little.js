const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Little = mongoose.model('Little', {
  title: String,
  user: String,
  content: String,
  projectId: { type: Schema.Types.ObjectId, ref: 'Little' }
});

module.exports = Little
