const router = require("express").Router();
const {jwtAuth} = require('../middleware');

router.use(jwtAuth.verifyToken);
router.get('/test', (req, res) => res.send({message: "Token verified access granted to the test ressource."}) );


module.exports = router;