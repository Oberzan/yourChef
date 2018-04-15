var router = express.Router();

const authentication = require('../controllers/authentication.js');

router.get('register', authentication.register);
  
module.exports = router;
  