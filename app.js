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
const session = require('express-session')

const app = express()

// CONNECT TO DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/littles', { useNewUrlParser: true })
mongoose.set('useFindAndModify', false);

// MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({ secret: 'secret-unique-code', cookie: { maxAge: 3600000 }, resave: true, saveUninitialized: true }))
app.use(express.static(__dirname + '/public'));

// app.use('/public', express.static(__dirname + '/public'));
// app.use(express.static(path.join(__dirname, '/public')));



// ROUTES
const littles = require('./routes/littles')(app)
const users = require('./routes/users')(app)

// SERVER
app.listen(port)

module.exports = app
