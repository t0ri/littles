// INITIALIZE LIBRARIES
const express = require('express')
const exphbs = require('express-handlebars')
const router = express.Router();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000
const Little = require('./models/little')
const User = require('./models/user')


const app = express()

// CONNECT TO DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/projects', { useNewUrlParser: true })

// MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// ROUTES
const littles = require('./routes/littles')(app)
const users = require('./routes/users')(app)

// SERVER
app.listen(port)

module.exports = app
