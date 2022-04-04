const { verifySignUp } = require("../middleware");
const controller = require("../controllers/authController.js");
const router = require("express").Router();

router.post(
    '/signup', 
    [
        verifySignUp.checkEmail,
        verifySignUp.checkUsername,
    ], 
    controller.signup
);
router.post('/signin', controller.signin);
router.post('/signout', controller.signout);

module.exports = router;