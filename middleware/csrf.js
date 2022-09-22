var { randomBytes } = require('crypto');

checkCSRF = (req, res, next) => {
	if (req.body.csrf !== req.session.csrf) return res.status(403).json({message:"Unauthorized !"});
    req.session.csrf = randomBytes(100).toString('base64'); // convert random data to a string

    next();

}

const csrf = {
	checkCSRF,
};

module.exports = csrf;
