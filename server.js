// link libraries and requirements
const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("./config/passport");
const db = require("./models");

//port setup
const PORT = process.env.PORT || 8080;

//express app and authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//handle bars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//sessions to track of users login status.
app.use(
    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/post-api-routes.js")(app);

//database sync
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});
