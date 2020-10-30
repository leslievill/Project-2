//linking models
const db = require("../models");
const { sequelize } = require("../models");

module.exports = function (app) {

    // create a route for getting all the posts.
    app.get("/api/posts", function (req, res) {
        db.Post.findAll({}).then(function (data) {
            res.json(data);
        });
    });
    // create a route for retrieving a single post.
    app.get("/api/posts/:id", function (req, res) {
        db.Post.findOne({
            where: {
                id: req.params.id
            },
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });
    // create a route for saving a new post.
    app.post("/api/posts", function (req, res) {
        db.Post.create(req.body).then(function (data) {
            console.log('New Post Created: ', data)
            res.json(data);
        });
    });
    // create a delete route for deleting of specific posts.
    app.delete("/api/posts/:id", function (req, res) {
        // We just have to specify which post we want to destroy with "where"
        db.Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        });
    });
    // create a put route for updating posts.
    app.put("/api/posts", function (req, res) {
        db.Post.update(
            {
                title: req.body.title,
                category: req.body.category,
                body: req.body.body,
                date: req.body.date,
            },
            {
                where: {
                    id: req.body.id
                }
            }).then(function (data) {
                console.log('request', req.body)
                res.json(data);
            });
    });
}