const express = require("express");
const cors = require("cors");
var cookieSession = require('cookie-session'); 
const app = express();
const authRouter = require('./routes/authRouter');
const ressourcesRouter = require('./routes/ressourcesRouter');
const userRouter = require("./routes/userRouter");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
require('dotenv').config();

//config database
const db = require("./app/models");

//FOR CSRF
app.use(cookieSession({
	name: 'session',                              // name of the cookie
	secret: 'MAKE_THIS_SECRET_SECURE',            // key to encode session
	maxAge: 24 * 60 * 60 * 1000,                  // cookie's lifespan
	sameSite: 'lax',                              // controls when cookies are sent
	path: '/',                                    // explicitly set this for security purposes
	secure: process.env.NODE_ENV === 'production',// cookie only sent on HTTPS
	httpOnly: true                                // cookie is not available to JavaScript (client)
}));

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {extended:true} ));
app.use(cookieParser());

//router config
app.use("/api/auth", authRouter);
app.use("/api/ressources", ressourcesRouter);
app.use("/api/users", userRouter);

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 25, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

//example route
app.get("/", (req, res) => res.json("Welcome to authenticator API") );


//Config
const PORT = process.env.PORT || 8000;
var server = app.listen(PORT, () => console.log(`Server running on port ${PORT}\n`) );