const passport = require('passport')

const siteRoute = require('./site');
const adminRoute = require('./admin');
const bookRoute = require('./book');
const { checkAuthenticated } = require('../app/middleware/ctr');
const { checkNotAuthenticated } = require('../app/middleware/ctr');

function router(app) {
    app.use('/admin', checkAuthenticated, adminRoute);
    app.get('/login', checkNotAuthenticated, (req, res) => {
        res.render('login')
    })
    app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true
    }))
    app.delete('/logout', (req, res) => {
        req.logOut()
        res.redirect('/login')
    })
    app.use('/book', bookRoute);
    app.use('/', siteRoute);

}

module.exports = router;