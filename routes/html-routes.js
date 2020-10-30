// require path that can use relative routes for the HTML.
const path = require("path");
const db = require("../models");
// require middleware for verifying in user is logged in.
const isAuthenticated = require("../config/middleware/isAuthenticated");
// create a route that sends user to members page if already logged in.
module.exports = function (app) {
    app.get("/", (req, res) => {
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });
    // create a route that sends user to members page if they are already logged in and try to access the login page.
    app.get("/login", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });
    app.get("/bucketlist", async(req, res) => {
        res.sendFile(path.join(__dirname, "../public/bucketlist.html"));
        db.Post.findAll({}).then(function(data) {
          console.log('All Posts: ', data)
          res.render("index", {data});
        });
      });
    // create a route that will direct a user who is not logged that tries to access the members page to the signup page.
    app.get("/members", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/members.html"));
    });
};