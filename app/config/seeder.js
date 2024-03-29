const { Sequelize } = require("sequelize");
const config = require("./db.js")
const db = require('../models')
require('dotenv').config();

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

async function init() {
    try {
        await db.sequelize.sync({ force: true });
        await db.type.bulkCreate([
            {name:"Alimentaire"},
            {name:"Vehicule"},
            {name:"Divertissement"},
            {name:"Santé"},
            {name:"Vêtements"},
            {name:"Sport"},
            {name:"Shopping"},
            {name:"Impôts"},
            {name:"Esthétique / soins"},
            {name:"Animaux"},
        ]);
     
        await db.roles.bulkCreate([
            {id:0, name: "parent"},
            {id: 1, name: "child"}
        ]);

        await console.log("Types inserted"); 
        await process.exit();
    } catch(e) {
        console.error(e);
    }
}

    
init();