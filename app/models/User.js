module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define(
		"users", 
		{
			username : { type: Sequelize.STRING },
			email: { type: Sequelize.STRING, unique: true },
			password: { type: Sequelize.STRING },
			parent_id: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		}
	);

	return User;
};
