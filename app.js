// Include the mysql package so we can access the db
var mysql = require("mysql");
// Include the FS library so we can output a file
const fs = require("fs");
// Include Inquirer to prompt the user on the command line
const inquirer = require("inquirer");
const tabler = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "indiGlow3",
    database: "employee_tracker"
});

var employee;

connection.connect(function(err) {
  if (err) throw err;
 // console.log("connected as id " + connection.threadId);
 // employee = new Employee(connection);
  mainMenu();
});

function mainMenu() {
    // console.log("done.");
  
 // var consoleView = new Viewing(connection);
  // Create an array of questions for Inquirer
  let questions = [ {type: 'list',
      message: 'What would you like to do next?',
      name: 'user_choice',
      choices:[ { name: 'View all employees'},
                { name: 'Add an employee'},
                { name: 'Add an role'},
                { name: 'Add an department'}]}];

  // invoke the Inquirer 
  inquirer
  .prompt(questions).then(answers => {
    switch(answers.user_choice) {
      case "View all employees":
        //consoleView.allEmployees(connection);
        displayAll();
        break;
      case "Add an employee":
        gatherNewEmployee();
        break;
      case "Add a role":
        break;
      case "Add a department":
        break;
    }
  });
} // end of mainMenu function

function displayAll() {
  var fullyJoinedDBQuery = 
  `SELECT employee.first_name, employee.last_name AS e1, 
  role.title, department.name, role.salary,
  CONCAT( mgr.first_name, " ", mgr.last_Name) AS manager
  FROM employee
  INNER JOIN role ON role.id = employee.role_id
  INNER JOIN department ON role.department_id = department.id
  LEFT JOIN employee mgr ON employee.manager_id= mgr.id;`;

  //"SELECT * FROM employee"

  connection.query(fullyJoinedDBQuery, function(err, res) {
  if (err) throw err;

    var myTable = tabler.getTable(res);
    myOutput = myTable.split("null").join("");

    console.log(myOutput);
    mainMenu();
  });
}
function gatherNewEmployee() {

  var role_query = `SELECT * FROM role;`;

  connection.query(role_query, function(err, roles) {
      if (err) throw err;
      let roleNames = roles.map(role=>{ return role.title; });

      let employee_query = `SELECT * FROM employee;`;
      connection.query(employee_query, function(err, employees) {
        if (err) throw err;
        
        let employeeNames = employees.map(employee=> { return (employee.first_name + " " + employee.last_name) ; });
      
        var questions = [
          {
              name: "first_name",
              message: "First Name:",
              default: "",
          },
          {
              name: "last_name",
              message: "Last Name:",
              default: "",
          },
          {
              name: "role",
              message: "Role:",
              type: "list",
              choices: roleNames,
              default: "",
          },
          {
              name: "manager",
              message: "Manager:",
              type: "list",
              choices: employeeNames,
              default: ""
          }];
    // invoke the Inquirer 
    inquirer
    .prompt(questions).then(answers => {

    
        let roleIndex = roleNames.indexOf(answers.role);
        let role_id = roles[roleIndex].id;

        let managerIndex = employeeNames.indexOf(answers.manager);
        let manager_id = employees[managerIndex].id;

        let newEmployee = { first_name: answers.first_name,
                            last_name: answers.last_name,
                            role_id: role_id,
                            manager_id: manager_id};
              
        mainMenu();
      });

      });
      
});

} // end of gather new employee

  // Add departments, roles, employees
  // View departments, roles, employees
  // Update employee roles
  
  
  // Bonus points if you're able to:
  // Update employee managers
  // View employees by manager
  // Delete departments, roles, and employees
  // View the total utilized budget of a department -- ie the combined salaries of all employees in that department

