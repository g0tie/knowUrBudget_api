const db = require("../app/models");
const config = require("../app/config/auth");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync( req.body.password, 8 )
        });
        
        if (user) res.status(200).send({message: "Registration successful"});
    } catch (e) {
        return res.status(500).send({message: e.message});
    }
}

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({where: {
        
                username : req.body.username
            }
        });

        if (!user) return res.status(404).send({message: "User not found"}); 

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).send({message: "Password is invalid"});
    
        const token = jwt.sign({id: user.id, }, config.secret, { expiresIn: 86400 /*24h*/ });

        req.session.token = token;

        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email
        });

    } catch (e) {
        return res.status(500).send({message: e.message});
    }
}

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({message: "You are now disconnected"});
    } catch (e) {
        return res.status(500).send({message: e.message});
    }
}