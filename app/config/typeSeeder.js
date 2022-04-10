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
            { name: "Alimentaire" },
            { name: "Vêtements" },
            { name: "Décorations" },
            { name: "Meuble" },
            { name: "Hygiène" },
            { name: "Santé" },
            { name: "Jardin" },
            { name: "Bricolage" },
            { name: "Scolaire" },
            { name: "Divertissement" },
           
        
        ]);
        await console.log("Types inserted"); 
        await process.exit();

    } catch(e) {
        console.error(e);
    }
}

    
init();