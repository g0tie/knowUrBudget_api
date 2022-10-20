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

const corsOptions = {
	"origin": [
		"http://localhost:3000",
		"http://localhost",
		"https://knowurbudget-app.vercel.app",
		"https://knowurbudget-cy3d1g7mr-g0tie.vercel.app",
	],
	"methods": "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	credentials: true,
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded( {extended:true} ));
app.use(cookieParser());

//config database
const db = require("./app/models");
app.set('trust proxy', 1);

//FOR CSRF
app.use(cookieSession({
	secret: 'sdfd5f47ds8f79df412ds14f5d4fù^dsmf*ùdsl^fmùdsofçè_dçs-fè(-dè_fkdsbfn/.#',
    sameSite: 'none',
    secure: true,
    httpOnly: true,                          // cookie is not available to JavaScript (client)
}));

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