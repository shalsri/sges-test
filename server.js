'use strict'

const express        = require('express');
const SERVER         = express();
const port           = 5001;
var db               = require('mongoose');
const bodyParser     = require('body-parser');
var cors             = require('cors');
const session        = require('express-session');
const MongoStore     = require('connect-mongo')(session);
var cookieParser     = require('cookie-parser');

var samples          = require('./routes/samples');
var tests            = require('./routes/tests');
var userspass        = require('./routes/usersPassport');
var passport         = require('passport');

var users            = require('./routes/users');
var fPwd             = require('./routes/forgotPassword');

var moisture_content = require('./routes/determination_of_moisture_contents');
var specific_gravity = require('./routes/determination_of_specific_gravity');

var func1   = require('./config/testInfoTable').func1;

db.connect('mongodb://localhost:27017/sarathyGeoTech', { useNewUrlParser: true }).then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });

require('./config/passport')(passport); // pass passport for configuration

func1();

SERVER.get('/', function (req, res) {
 
    res.send('hello jenkins AGAIN');
   
});


SERVER.use(express.static('public'));
SERVER.use('/UI_icons', express.static('public' + '/UI_icons'));

SERVER.use(bodyParser.json());
SERVER.use(bodyParser.urlencoded({ extended: false }));

// For Passport
SERVER.use(session({
    secret: 'welcomesges',
    store: new MongoStore({url: 'mongodb://localhost/sgessession'})//persistent session
}));

SERVER.use(passport.initialize());
SERVER.use(passport.session()); // persistent login 
SERVER.use(cookieParser()); 
// SERVER.use(flash()); 
// SERVER.use(cors());

SERVER.use('/tests', tests);
SERVER.use('/samples', samples);
SERVER.use('/moisturecontenttests', moisture_content);
SERVER.use('/specificgravitytests', specific_gravity);
SERVER.use('/userspass', userspass);
SERVER.use('/users', users);
SERVER.use('/forgotPassword', fPwd);

require('./routes/usersPassport')(SERVER, passport);

SERVER.listen(port, () => console.log(`app listening on port ${port}!`));


module.exports = SERVER;
