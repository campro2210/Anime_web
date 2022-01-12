const express = require('express');
const app = express();
const port = 3000;

const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('../src/app/middleware/passport-config')
initializePassport(
  passport,
  name => users.find(user => user.name === name),
  id => users.find(user => user.id === id)
)
const users = [{id: '0hgjkdf867sdf8vcusidf',name: 'admin',password:"$2b$10$D5PreFaJ7F5WDnaYhqohQOCSUdbsVO1MRFf1thQfJY.gCbVypOzcS"}]

app.use(flash())
app.use(session({
  secret: 'secret',//process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

const db = require('./app/db');
const router = require('./route');
const methodOverride = require('method-override');

//connect db
db.connect();

app.use(methodOverride('_method'));
app.use(
    express.urlencoded({
        extended: false,
    }),
);

app.use(express.json());
app.use(express.static('./src/public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');

const cors = require('cors')

app.use(cors())


router(app);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));