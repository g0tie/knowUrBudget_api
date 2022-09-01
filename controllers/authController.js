const db = require("../app/models");
const config = require("../app/config/auth");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Limit = db.limit;

exports.signup = async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync( req.body.password, 8 ),
            limit: 500
        }, { 
            include: [{
                association:  User.associations.limit,
                as: 'limit'
            }]
        });

        const token = await jwt.sign(
            { id: user.id,  },
            config.secret,
            {
              expiresIn: "7d",
            }
        );
        await user.save();

        if (user) res.status(200).send({message: "Registration successful", token: JSON.stringify(token)});
    } catch (e) {
        return res.status(500).send({message: e.message});
    }
}

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({where: {
        
                email : req.body.email
            }
        });

        if ( !user)  return res.status(404).send({message: "User not found"}); 

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).send({message: "Password is invalid"});
    
        const token = jwt.sign({id: user.id, }, config.secret, { expiresIn: "7d" });

        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            token
        });

    } catch (e) {
        return res.status(500).send({message: "Invalid credentials"});
    }
}
