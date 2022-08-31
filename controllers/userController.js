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
        const user = await User.findOne({id: req.body.userId});
        const res = {
            limit: user.getLimits(),
            expenses: user.getExpenses(),
            user: {name: user.firstname},
            childrenAccounts:  await User.findAll({
                where: {
                    parent_id: req.body.userId
                }
            })
        };

        return res.status(200).send(res);
        
    } catch (e) {
        return res.status(500).send({message: `Cannot get user role`});
    }
}

exports.getChildrenAccount = async (req, res) => {
    try {
        const userId = await jwt.verify(req.session.token, config.secret).id;
        const children = await User.findAll({
            where: {
                parent_id: userId
            }
        })

        return res.status(200).send(children);
        
    } catch (e) {
        return res.status(500).send({message: `Cannot get user role`});
    }
}

exports.getRole = async (req, res) => {
    try {
        const userId = await jwt.verify(req.session.token, config.secret).id;
        const user = await User.findOne({userId});
        const role = await user.getRoles({
            where: {
                id: user.role_id
            }
        });

        return res.status(200).send({role});
    } catch (e) {
        return res.status(500).send({message: `Cannot get user role`});
    }
}

exports.getExpenses = async (req, res) => {
    try {
        const typeId = req.body.typeId || false;
        const userId = await jwt.verify(req.session.token, config.secret).id;
        const expenses = await Expense.findAll({
            where: {
                userId,
                ...(typeId) && { typeId },
            },
            limit: 10
        });

        return res.status(200).send({expenses});

    } catch (e) {
        return res.status(500).send({message: `Server error occurred`});
    }
}

exports.addExpense = async (req, res) => {
    try {
        const userId = await jwt.verify(req.session.token, config.secret).id;
        const date = await new Date();
        const expenses = await Expense.create({
            userId,
            name: req.body.name,
            amount: req.body.amount,
            date: date.toISOString()
        });
        const type = await Type.findOne({id: req.body.typeId});
        await expenses.setType(type);

        if (!expenses) return res.status(400).send({message: "Error, could not add expense"});

        return res.status(200).send({message: "Expense added"});
        
    } catch (e) {
        return res.status(500).send({message: `Error has occured ${e}`});
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const userId = await jwt.verify(req.session.token, config.secret).id;
        const expense = await Expense.findOne({id: req.body.expenseId, userId});
        let success = await expense.destroy();

        if (success) return res.status(200).send({message: "Expense deleted"});

    } catch(e) {
      return res.status(200).send({message: "Error cannot delete"});

    }
}

exports.updateExpense = async (req, res) => {
    try {
        const userId = await jwt.verify(req.session.token, config.secret).id;
        const expense = await Expense.findOne({id: req.body.expenseId, userId});

        await expense.set(req.body);
        await expense.save();

        if (expense) return res.status(200).send({message: "Expense updated"});


    } catch(e) {
      return res.status(200).send({message: "Error cannot update"});
        
    }
}

exports.getLimit = async (req, res) => {
    try {
        const userId = await jwt.verify(req.session.token, config.secret).id;
       
        const limit = await Limit.findOne({
            where: {
                userId
            }
        });

        !limit && res.send({message:"No limit found for user"});

        return res.status(200).send({message: "success" , limit});

    } catch (e) {
        return res.status(500).send({message: `Error has occured ${e}`});
    }
}

exports.setLimit = async (req, res) => {
    try {
        const newLimit = await parseInt( req.body.limit );
        const userId = await jwt.verify(req.session.token, config.secret).id;

        if (!newLimit && Number.isInteger(newLimit) ) return res.status(400).send({message: "Cannot update limit"});

        
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

            return res.status(200).send({message: "Limit created"});
        } else {

            limit.amount = await newLimit;
            await limit.save();
            return res.status(200).send({message: "Limit updated"});
        }

    } catch (e) {
        return res.status(500).send({message: `Error has occured ${e}`});
    }
}