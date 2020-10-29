'use strict';
// Requirement to write to a file.
const fs = require('fs');
//Provides a way of working with directories and file paths.
const path = require('path');
// Allows sequelize to be used.
const Sequelize = require('sequelize');
// Returns the basename, final location of a path.
const basename = path.basename(module.filename);
// Default run environment will be local if node not available.
const env = process.env.NODE_ENV || 'development';
// Requires for connection to database.
const config  = require(__dirname + '/../config/config.json')[env];
const db = {};
// If environment variable is true
if (config.use_env_variable) {
// Then the sequelize variable will be new.  
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
// writing to a file.
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  // for loop that will iterate through each item in the array.
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });
// creates an array of keys of the model objects and uses a for loop to go through each one.
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// Exports to a db (database)
module.exports = db;
