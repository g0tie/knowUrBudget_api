require('dotenv').config();
module.exports = {
	HOST:process.env.HOST,
	USER:process.env.DBUSER,
	PASSWORD:process.env.DBPASSWORD,
	DB:process.env.DB,
	dialect:"mysql",
};
