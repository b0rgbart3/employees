// Include the mysql package so we can access the db
var mysql = require("mysql");
// Include the FS library so we can output a file
const fs = require("fs");
// Include Inquirer to prompt the user on the command line
const inquirer = require("inquirer");

// Include my own external node js file for displaying
const Viewing = require("./viewing");

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
    // console.log("done.");
  
  var consoleView = new Viewing(connection);
  // Create an array of questions for Inquirer
  let questions = [
  {
    type: 'list',
      message: 'What would you like to do?',
      name: 'user_choice',
      choices: [
        {
          name: 'View all employees',
        },
        {
          name: 'Add an employee',
        },
        {
          name: 'Add an role',
        },
        {
          name: 'Add an department',
        },
      ]
    },
  ];

  // invoke the Inquirer 
  inquirer
  .prompt(questions).then(answers => {
    switch(answers.user_choice) {
      case "View all employees":
        consoleView.allEmployees(connection);
        break;
      case "Add an employee":
        break;
      case "Add a role":
        break;
      case "Add a department":
        break;
    }
  });

  // Add departments, roles, employees
  // View departments, roles, employees
  // Update employee roles
  
  
  // Bonus points if you're able to:
  // Update employee managers
  // View employees by manager
  // Delete departments, roles, and employees
  // View the total utilized budget of a department -- ie the combined salaries of all employees in that department
}