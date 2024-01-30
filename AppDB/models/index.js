const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
// User model
db.user = require("./user.model");
// Role model
db.role = require("./role.model");

db.ROLES =["user","admin", "moderator"];

module.exports = db;