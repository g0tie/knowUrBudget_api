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

        return res.status(200).send({message: "Expenses found", expenses});

    } catch (e) {
        return res.status(500).send({message: `Error has occured: ${e}`});
    }
}

exports.addExpense = async (req, res) => {
    try {
        const userId = await jwt.verify(req.session.token, config.secret).id;
        const date = new Date();
        const expenses = Expense.create({
            userId,
            name: req.body.name,
            type: req.body.type,
            amount: req.body.amount,
            date: date.toISOString()
        });

        if (!expenses) return res.status(400).send({message: "Error, could not add expense"});
        
    } catch (e) {
        return res.status(500).send({message: `Error has occured ${e}`});
    }
}

exports.getLimit = async (req, res) => {
    try {

    } catch (e) {
        return res.status(500).send({message: `Error has occured ${e}`});
    }
}

exports.setLimit = async (req, res) => {
    try {

    } catch (e) {
        return res.status(500).send({message: `Error has occured ${e}`});
    }
}