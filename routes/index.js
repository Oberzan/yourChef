let express = require('express');
let passport = require('passport');
let guard = require('express-jwt-permissions')()
let router = express.Router();

const index = require('../controllers/index.js');
const authentication = require('../controllers/authentication.js');

/* GET home page. */
// router.get('/', (req,res) => console.log(req));
router.get('/', guard.check('USER'), index.homepage);
router.use((err, req, res, next) => err.status === 403 && next());
router.get('/', (req,res) => res.render('index', {title: 'YourChef - unregistred' }));

router.get('/register', authentication.renderRegister);
router.post('/register', authentication.register);

router.get('/login', authentication.renderLogin);
router.post('/login', passport.authenticate('local'), authentication.authenticate);

module.exports = router;
