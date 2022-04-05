module.exports = (sequelize, Sequelize) => {
	const Limit = sequelize.define(
		"limits", 
		{
			amount: { type: Sequelize.DECIMAL },
			date: { type: Sequelize.DATE },
		}
	);
	
	return Limit;
};
