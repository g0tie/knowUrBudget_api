module.exports = (sequelize, Sequelize) => {
	const Limit = sequelize.define(
		"limits", 
		{
			amount: { type: Sequelize.DECIMAL,   defaultValue: 500, },
			date: { type: Sequelize.DATE },
		}
	);
	
	return Limit;
};
