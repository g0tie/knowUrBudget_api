const db = require("../app/models");
const User = db.user;
const { Op } = require("sequelize");

checkEmail = async (req, res, next) =>
{
	try {
		if (await !req.body.email) return res.status('400').send({message: "Email requis"});
		let user = await User.findOne({ 
			where: {
				email: {
					[Op.like]: req.body.email 
				} 
			}
		});
		if (user) return res.status(409).send({message: "L'utilisateur existe déjà"});
		next();

	} catch (e) {
		console.error(`error occured: ${e}`);
		return res.status(500).send({ message: "Erreur serveur"});
	}
}


checkUsername = async (req, res, next) =>
{
	try {
		let user = await User.findOne({ 
			where: {
				email: {
					[Op.like]: req.body.username 
				} 
			}
		});
		if (user) return res.status(400).send({message: "L'utilisateur existe déjà"});
		next();

	} catch (e) {
	
		return res.status(500).send({ message: "Erreur serveur"});
	}
}


const verifySignUp = {
	checkEmail,
	checkUsername,
};

module.exports = verifySignUp; 










