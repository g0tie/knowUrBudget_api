const jwt = require("jsonwebtoken");
const config = require("../app/config/auth.js");
const db = require("../app/models");
const User = db.user;

verifyToken = (req, res, next) => {
	let token = req.session.token;

	if (!token) return res.status(403).send({message: "Unauthorized ! No token found"});
	
	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) return res.status(403).send({message: "Unauthorized"});	
		
		req.userId = decoded.id;
		next();
	});

}

const jwtAuth = {
	verifyToken,
};

module.exports = jwtAuth;
