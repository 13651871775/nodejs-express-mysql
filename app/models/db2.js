const mysql2 = require("mysql2/promise");
const dbConfig = require("../config/db.config.js");

var connection2 = mysql2.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection2;
