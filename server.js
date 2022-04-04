const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const authRouter = require('./routes/authRouter');
const ressourcesRouter = require('./routes/ressourcesRouter');

//config database
const db = require("./app/models");
db.sequelize.sync({force:true})
.then(() => console.log("Sync db"));

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {extended:true} ));
app.use(
	cookieSession({
		name: "auth-session",
		secret: require("./app/config/auth").secret,
		httpOnly: true
	})
);

//router config
app.use("/api/auth", authRouter);
app.use("/api/ressources", ressourcesRouter);

//example route
app.get("/", (req, res) => res.json("Welcome to authenticator API") );


//Config
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`) );
