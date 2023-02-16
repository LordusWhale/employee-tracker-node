const mysql = require("mysql2");
require("dotenv").config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
});

module.exports = {connection}