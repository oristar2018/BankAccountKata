const express = require("express");
const app = express();
const dotEnv = require("dotenv").config();
const path = require("path");
const dbPath = process.env.DB_PATH;
const dbPath2 = "mongodb://mongo:27017/docker-node-mongo2";
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.connect(dbPath2, { useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("body-parser").text());
app.use(
	session({
		secret: "keyboard cat",
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 24 * 60 * 60 * 1000 }
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "client", "build")));

app.use(
	cors({
		origin: ["http://localhost:3000", "http://localhost:8887"],
		credentials: true
	})
);

app.use("/users", require("./routes/mainRoutes"));

/*app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});*/

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = 8887;

app.listen(port);