const router = require("express").Router();
const {jwtAuth} = require('../middleware');
const controller = require('../controllers/userController.js');

router.use(jwtAuth.verifyToken);

router.get('/expenses', controller.getExpenses);
router.post('/expenses', controller.addExpense);
router.put('/expenses', controller.updateExpense);
router.delete('/expenses', controller.deleteExpense);


router.get('/limit', controller.getLimit);
router.post('/limit', controller.setLimit);


module.exports = router;