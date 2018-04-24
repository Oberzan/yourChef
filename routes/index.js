let express = require('express');
let passport = require('passport');
let jwt = require('express-jwt');
let router = express.Router();

let auth = jwt({
    secret: process.env.JWT_PASSWORD,
    userProperty: 'payload'
});
const index = require('../controllers/index.js');
const authentication = require('../controllers/authentication.js');

/* GET home page. */
router.get('/', (req, res) => console.log(req.headers));
router.get('/', auth, index.homepage);
router.get('/', (req,res) => res.render('index', {title: 'YourChef - unregistred' }));

router.get('/register', authentication.renderRegister);
router.post('/register', authentication.register);

router.get('/login', authentication.renderLogin);
router.post('/login', passport.authenticate('local'), authentication.authenticate);

module.exports = router;
