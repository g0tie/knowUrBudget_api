const router = require("express").Router();
const {jwtAuth} = require('../middleware');
const controller = require('../controllers/userController.js');

router.use(jwtAuth.verifyToken);


router.get('/expenses');
router.post('/expenses');
router.post('/limit');
router.update('/limit');


module.exports = router;