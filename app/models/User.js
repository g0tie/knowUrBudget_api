module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define(
		"users", 
		{
			username : { type: Sequelize.STRING },
			email: { type: Sequelize.STRING, unique: true },
			password: { type: Sequelize.STRING }
		}
	);

	return User;
};
