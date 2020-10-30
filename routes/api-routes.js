// Require the models and passport from config directory.
const db = require("../models");
const passport = require("../config/passport");

// Using passport to authenticate. 
module.exports = function (app) {
    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    });
}
// Create a route for creating a new user account.
app.post("/api/signup", (req, res) => {
    db.User.create({
        email: req.body.email,
        password: req.body.password
    })
        .then(() => {
            res.redirect(307, "/api/login");
        })
        .catch(err => {
            res.status(401).json(err);
        });
});
// Create a route for user logout.
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});
// Create a route returning the user's data to be used on the client side.
app.get("/api/user_data", (req, res) => {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
    } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    }
});
