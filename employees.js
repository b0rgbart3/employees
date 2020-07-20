// Include the mysql package so we can access the db
var mysql = require("mysql");
// Include the FS library so we can output a file
const fs = require("fs");
// Include Inquirer to prompt the user on the command line
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "indiGlow3",
    database: "employee_tracker"
  });

