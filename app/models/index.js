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
db.type = require("./Type.js")(sequelize, Sequelize);
db.role = require("./Role")(sequelize, Sequelize);

//Relations
db.user.hasOne(db.limit, {
	foreignKey: "userId"
});
db.user.hasOne(db.role, {
	foreignKey: "role_id"
});

db.role.belongsTo(db.user);
db.limit.belongsTo(db.user);

db.user.hasMany(db.expense);
db.type.hasMany(db.expense, {
	foreignKey: 'typeId',
});
db.expense.belongsTo(db.type);

module.exports = db;








