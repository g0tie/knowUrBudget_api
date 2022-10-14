const { verifySignUp } = require("../middleware");
const controller = require("../controllers/authController.js");
const router = require("express").Router();
const { body, validationResult } = require('express-validator');

router.post(
    '/signup', 
    [
        verifySignUp.checkEmail,
        verifySignUp.checkUsername,
        body('username', 'Veuillez entrez un nom d\'utilisateur plus long').exists().isLength({min:3}),
        body('email', 'Email invalide').exists().isEmail(),
        body('password', 'Le mot de passe doit être de minimum 8 caractères').isLength({ min: 8 }),
    ], 
    controller.signup
);
router.post(
    '/signin', 
    
        body('email', 'Email invalide').exists().isEmail(),
        body('password', 'Le mot de passe doit être de minimum 8 caractères').isLength({ min: 8 })
    ,
    controller.signin
);

router.post('/signout', controller.signout);

module.exports = router;