const db = require("../app/models");
const User = db.user;
const Expense = db.expense;
const Type = db.type;
const Limit = db.limit;
const config = require('../app/config/auth.js');
const jwt = require("jsonwebtoken");
const Role = require("../app/models/Role");
const { Op } = require("sequelize");


exports.getDatas = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: { exclude: ['password'] },
            where: { id: req.userId }, 
            include: [
            {model: Expense},
            {model: Limit}
        ]});
        return res.status(200).json({user, csrf: req.session.csrf});
        
    } catch (e) {
        return res.status(500).json({message: e});
    }
}

exports.getExpenses = async (req, res) => {
    try {
        const typeId = req.body.typeId || false;
        const userId = req.userId;
        const expenses = await Expense.findAll({
            where: {
                userId,
                ...(typeId) && { typeId },
            },
            limit: 10
        });

        return res.status(200).json({expenses, csrf:req.session.csrf });

    } catch (e) {
        return res.status(500).json({message: `Server error occurred`});
    }
}

exports.addExpense = async (req, res) => {
    try {
        const userId = req.userId;
        const date = await new Date();
        const expenses = await Expense.create({
            userId,
            name: req.body.name,
            amount: req.body.amount,
            date: date.toISOString()
        });
        const type = await Type.findOne({id: req.body.typeId});
        await expenses.setType(type);

        if (!expenses) return res.status(400).json({message: "Error, could not add expense"});

        return res.status(200).json({message: "Expense added", value: expenses.id, csrf:req.session.csrf});
        
    } catch (e) {
        return res.status(500).json({message: `Error has occured ${e}`});
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const userId = req.userId;
        const expense = await Expense.findOne({id: req.body.expenseId, userId});
        let success = await expense.destroy();

        if (success) return res.status(200).json({message: "Expense deleted",  csrf:req.session.csrf});

    } catch(e) {
      return res.status(200).json({message: "Error cannot delete"});

    }
}

exports.updateExpense = async (req, res) => {
    try {
        const userId = req.userId;
        const expense = await Expense.findOne({id: req.body.id, userId});

        await expense.set(req.body);
        await expense.save();

        if (expense) return res.status(200).json({message: "Expense updated", csrf:req.session.csrf});


    } catch(e) {
      return res.status(200).json({message: "Error cannot update"});
        
    }
}

exports.getLimit = async (req, res) => {
    try {
        const userId = req.userId;
       
        const limit = await Limit.findOne({
            where: {
                userId
            }
        });

        !limit && res.json({message:"No limit found for user"});

        return res.status(200).json({message: "success" , limit,  csrf:req.session.csrf});

    } catch (e) {
        return res.status(500).json({message: `Error has occured ${e}`});
    }
}

exports.setLimit = async (req, res) => {
    try {
        const newLimit = await parseInt( req.body.limit );
        const userId = req.userId;

        if (!newLimit && Number.isInteger(newLimit) ) return res.status(400).json({message: "Cannot update limit"});

        
        const limit = await Limit.findOne({
            where : {
                userId
            }
        });
        
        if (!limit) {
            let createLimit = await Limit.create({
                amount: newLimit,
            });
            const user = await User.findOne( {id: userId });
            await createLimit.setUser(user);

            return res.status(200).json({message: "Limit created",  csrf:req.session.csrf});
        } else {

            limit.amount = await newLimit;
            await limit.save();
            return res.status(200).json({message: "Limit updated",  csrf:req.session.csrf});
        }

    } catch (e) {
        return res.status(500).json({message: `Error has occured ${e}`});
    }
}