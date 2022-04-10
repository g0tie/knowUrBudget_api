module.exports = (sequelize, Sequelize) => {
	const Type = sequelize.define(
		"types", 
		{
			name: { type: Sequelize.STRING, unique:true},
		}
	);
	
	return Type;
};
