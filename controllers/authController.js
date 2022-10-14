const db = require("../app/models");
const config = require("../app/config/auth");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const serialize = require("cookie").serialize;
var { randomBytes } = require('crypto');

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

        const serialized = await serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
        });

        await  res.setHeader('Set-Cookie', serialized);

        if (req.session.csrf === undefined) {
            req.session.csrf = randomBytes(100).toString('base64'); // convert random data to a string
        }

        if (user) res.status(200).json({message: "Registration successful", csrf: req.session.csrf, id:user.id});
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
}

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({where: {
        
                email : req.body.email
            },
           
        });

        if ( !user)  return res.status(404).json({message: "User not found"}); 

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).json({message: "Password is invalid"});
    
        const token = jwt.sign({id: user.id, }, config.secret, { expiresIn: "7d" });

        const serialized = await serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
        });
        
        await res.setHeader('Set-Cookie', serialized);
        
        if (req.session.csrf === undefined) {
            req.session.csrf = randomBytes(100).toString('base64'); // convert random data to a string
        }


        return res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            csrf:  req.session.csrf
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({message: "Invalid credentials"});
    }
}

exports.signout = async (req, res) => {
    const { cookies } = req;

    const jwt = cookies.token;
    
    if (!jwt) {
        return res.status(401).json({
          status: 'error',
          error: 'Unauthorized',
        });
    }
    
    const serialized = serialize('token', null, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: -1,
        path: '/',
    });

    res.setHeader('Set-Cookie', serialized);
    res.status(200).json({
        status: 'success',
        message: 'Logged out',
    });
}