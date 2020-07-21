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

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
  });

  function afterConnection() {
      console.log("done.");
  }

  // Create an array of questions for Inquirer

  // invoke the Inquirer 

  // Add departments, roles, employees
  // View departments, roles, employees
  // Update employee roles
  
  
  // Bonus points if you're able to:
  // Update employee managers
  // View employees by manager
  // Delete departments, roles, and employees
  // View the total utilized budget of a department -- ie the combined salaries of all employees in that department