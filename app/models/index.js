//INITILIAZE SEQUELIZE ORM

const config = require("../config/db.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
	config.DB,
	config.USER,
	config.PASSWORD,
	{
		host: config.HOST,
		dialect: config.dialect,
		operatorsAliases: false
	}

);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User.js")(sequelize, Sequelize);
db.expense = require("./Expense.js")(sequelize, Sequelize);
db.limit = require("./Limit.js")(sequelize, Sequelize);

//Relations
db.user.hasOne(db.limit);
db.user.hasMany(db.expense);

module.exports = db;








