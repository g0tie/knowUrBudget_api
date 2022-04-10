module.exports = (sequelize, Sequelize) => {
	const Type = sequelize.define(
		"types", 
		{
			name: { type: Sequelize.STRING },
		}
	);
	
	return Type;
};
