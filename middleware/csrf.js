var { randomBytes } = require('crypto');

checkCSRF = (req, res, next) => {
    const clientCsrfToken = req.body.csrf || req.params.csrf || req.query.csrf;
    
	if (clientCsrfToken !== req.session.csrf) return res.status(403).json({message:"Accès non autorisée !"});
    req.session.csrf = randomBytes(100).toString('base64'); 
    next();

}

const csrf = {
	checkCSRF,
};

module.exports = csrf;
