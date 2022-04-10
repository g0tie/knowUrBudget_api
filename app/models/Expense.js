module.exports = (sequelize, Sequelize) => {
	const Expense = sequelize.define(
		"expenses", 
		{
			name : { type: Sequelize.STRING },
			amount: { type: Sequelize.DECIMAL },
			date: { type: Sequelize.DATE },
		}
	);

	return Expense;
};
