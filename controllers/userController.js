const db = require("../app/models");
const User = db.user;
const Expense = db.expense;
const Limit = db.limit;
const config = require('../app/config/auth.js');

exports.getExpenses = async (req, res) => {
    try {
        const type = req.body.type || false;
        const userId = await jwt.verify(req.session.token, config.secret).id;
        const expenses = await Expense.findAll({
            where: {
                userId,
                ...(type) && { type },
                limit: 10,
            }
        });

        return res.status(200).send({message: "Epenses found", expenses});

    } catch (e) {
        return res.status(500).send({message: `Error has occured: ${e}`});
    }
}

exports.addExpense = async (req, res) => {
    try {
        const userId = await jwt.verify(req.session.token, config.secret).id;
        
    } catch (e) {
        res.status(500).send({message: `Error has occured ${e}`});
    }
}

exports.getLimit = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).send({message: `Error has occured ${e}`});
    }
}

exports.setLimit = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).send({message: `Error has occured ${e}`});
    }
}