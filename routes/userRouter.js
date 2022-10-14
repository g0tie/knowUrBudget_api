const router = require("express").Router();
const {jwtAuth, csrf} = require('../middleware');
const controller = require('../controllers/userController.js');

router.use(jwtAuth.verifyToken);
router.use(csrf.checkCSRF);

router.get('/expenses', controller.getExpenses);
router.post('/expenses', controller.addExpense);
router.put('/expenses', controller.updateExpense);
router.delete('/expenses',controller.deleteExpense);


router.get('/limit', controller.getLimit);
router.post('/limit', controller.setLimit);

router.get('/datas', controller.getDatas);
router.post('/datas', controller.setDatas);

module.exports = router;