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
  mainMenu();
});

function mainMenu() {

  // Create an array of questions for Inquirer
  let questions = [ {type: 'list',
      message: '\nWhat would you like to do next?',
      name: 'user_choice',
      choices:[ { name: 'View all employees'},
                { name: 'View employees by Department'},
                { name: 'View employees by Manager'},
                { name: 'Add an employee'},
                { name: 'Remove an employee'},
                { name: 'Update employee role'},
                { name: 'Update employee manager'},
                { name: 'View all roles'},
                { name: 'Add a role'},
                { name: 'View all departments'},
                { name: 'Add a department'}]}];

  // invoke the Inquirer 
  inquirer
  .prompt(questions).then(answers => {
    switch(answers.user_choice) {
      case "View all employees":
        displayAll();
        break;
      case "View employees by Department":
        viewEmployeesByDepartment();
        break;
      case "View employees by Manager":
        viewEmployeesByManager();
        break;
      case "Add an employee":
        addNewEmployee();
        break;
      case "Remove an employee":
        removeEmployee();
        break;
      case "Update employee role":
        updateEmployeeRole();
        break;
      case "Update employee manager":
        updateEmployeeManager();
        break;
      case "View all roles":
        viewAllRoles();
        break;
      case "Add a role":
        addNewRole();
        break;
      case "View all departments":
        viewAllDepartments();
        break;
      case "Add a department":
        addNewDepartment();
        break;
    }
  });
} // end of mainMenu function

function displayAll() {
  // This query pulls data from 3 different tables to 
  // create a full chart of info for each employee
  var fullyJoinedDBQuery = 
  `SELECT employee.id, employee.first_name, employee.last_name, 
  role.title, department.name, role.salary,
  CONCAT( mgr.first_name, " ", mgr.last_Name) AS manager
  FROM employee
  INNER JOIN role ON role.id = employee.role_id
  INNER JOIN department ON role.department_id = department.id
  LEFT JOIN employee mgr ON employee.manager_id= mgr.id;`;

  connection.query(fullyJoinedDBQuery, function(err, res) {
  if (err) throw err;

    // use console.table to generate a well formatted chart of data
    var myTable = tabler.getTable(res);
    
    // take out the "nulls"
    myOutput = myTable; // .split("null").join("");

    // this console.log() is actually part of the app functionality
    console.log(myOutput);
    mainMenu();
  });
}
function addNewEmployee() {

  // start by getting a list of roles from the db
  var role_query = `SELECT * FROM role;`;

  connection.query(role_query, function(err, roles) {
      if (err) throw err;
      let roleNames = roles.map(role=>{ return role.title; });

      // get a full list of employee names so we can choose who the new employee's manager is by name
      let employee_query = `SELECT * FROM employee;`;
      connection.query(employee_query, function(err, employees) {
        if (err) throw err;
        
        let employeeNames = employees.map(employee=> { return (employee.first_name + " " + employee.last_name) ; });
      
        // questions to ask for entering a new employee into the db
        var newEmployeeQuestions = [
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
              choices: roleNames,  // this array is coming from the role_query
              default: "",
          },
          {
              name: "manager",
              message: "Manager:",
              type: "list",
              choices: employeeNames, // this array is coming from the employee_query
              default: ""
          }];
    // invoke the Inquirer 
    inquirer
    .prompt(newEmployeeQuestions).then(answers => {

        // The user chose the role by name, but we need to store the role_id in the employee table
        let roleIndex = roleNames.indexOf(answers.role);
        let role_id = roles[roleIndex].id;

        // The user chose the manager by name, but we need to store the manager_id in the employee table
        let managerIndex = employeeNames.indexOf(answers.manager);
        let manager_id = employees[managerIndex].id;

        // let newEmployee = { first_name: answers.first_name,
        //                     last_name: answers.last_name,
        //                     role_id: role_id,
        //                     manager_id: manager_id};
        //console.log(newEmployee);
        let new_employee_query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
        ('${answers.first_name}', '${answers.last_name}', '${role_id}', '${manager_id}');`;
        connection.query(new_employee_query, function(err, newEmployee) {
            if (err) throw err;
              //  console.log("successfully added: "+ JSON.stringify(newEmployee));
              console.log("successfully added: "+ answers.first_name + " " + answers.last_name + "\n\n");
            mainMenu();
        });
      });

      });
      
});

} // end of add new employee


function addNewDepartment() {
     // questions to ask for entering a new employee into the db
     var newEmployeeQuestions = [
      {
          name: "name",
          message: "Department Name:",
          default: "",
      }];
      // invoke the Inquirer 
      inquirer
      .prompt(newEmployeeQuestions).then(answers => {
       // console.log(answers);
        // Need some validation here to check for duplicates and/or bad data

        new_dept_query = `INSERT INTO department (name) VALUES ('${answers.name}');`;
        connection.query(new_dept_query, function(err, newDept) {
            if (err) throw err;
               console.log("successfully added: "+ answers.name + "\n\n");
            mainMenu();
        });

      });
} // end of add new department

function addNewRole() {

   // start by getting a list of departments from the db
   var department_query = `SELECT * FROM department;`;

   connection.query(department_query, function(err, departments) {
       if (err) throw err;

      // console.log(departments);
       let deptNames = departments.map(dept=>{ return dept.name; });
      console.log(deptNames);
        // questions to ask for entering a new employee into the db
        var newRoleQuestions = [
          {
            name: "department",
            type: "list",
            message: "Department:",
            choices: deptNames  // this array comes from the departments query
          },
          {
              name: "title",
              message: "Role Title:",
              default: "",
          },
          {
              name: "salary",
              message: "Salary:",
              default: "0"
          }
  ];
        // invoke the Inquirer 
        inquirer
        .prompt(newRoleQuestions).then(answers => {
  
        //  console.log(answers);
            // The user chose the department by name, but we need to store the department_id in the role table
            let departmentIndex = deptNames.indexOf(answers.department);
            let department_id = departments[departmentIndex].id;

            new_role_query = `INSERT INTO role (title, salary, department_id) 
            VALUES ('${answers.title}', '${answers.salary}', '${department_id}');`;
            
            connection.query(new_role_query, function(err, newRole) {
                if (err) throw err;
                 //   console.log("successfully added: "+ JSON.stringify(newRole));
                 console.log("successfully added: "+ answers.title + "\n\n");
                mainMenu();
            });

        });
  });
} // end of add new department

function removeEmployee() {
    // get a full list of employee names so we can choose who the new employee's manager is by name
    let employee_query = `SELECT * FROM employee;`;
    connection.query(employee_query, function(err, employees) {
      if (err) throw err;
      
      let employeeNames = employees.map(employee=> { return (employee.first_name + " " + employee.last_name) ; });
      
      let removeEmployeeQuestions = [
        {
            name: "name",
            type: "list",
            message: "Which employee do you need to remove?",
            choices: employeeNames
        }];
        // invoke the Inquirer 
        inquirer
        .prompt(removeEmployeeQuestions).then(answers => {
                 // The user chose the manager by name, but we need to store the manager_id in the employee table
          let employeeIndex = employeeNames.indexOf(answers.name);
          let employee_id = employees[employeeIndex].id;
          let remove_query = `REMOVE * FROM employee WHERE ID='{$employee_id};`;
          connection.query(employee_query, function(err, employee) {
            if (err) throw err;
            console.log("Successfully removed employee: " + answers.name + "\n\n");
            mainMenu();
          });

        
        });
      });

}

function viewEmployeesByDepartment() {
 // start by getting a list of departments from the db
 var department_query = `SELECT * FROM department;`;

 connection.query(department_query, function(err, departments) {
     if (err) throw err;

    // console.log(departments);
     let deptNames = departments.map(dept=>{ return dept.name; });
   // console.log(deptNames);
      // questions to ask for entering a new employee into the db
      let viewByDeptQuestions = [
        {
          name: "department",
          type: "list",
          message: "Which department would you like to view?",
          choices: deptNames  // this array comes from the departments query
        }
];
      // invoke the Inquirer 
      inquirer
      .prompt(viewByDeptQuestions).then(answers => {

      //  console.log(answers);
          // The user chose the department by name, but we need to store the department_id in the role table
          let departmentIndex = deptNames.indexOf(answers.department);
          let department_id = departments[departmentIndex].id;

          //console.log("You chose dept: " + answers.department + ", with an id of: " + department_id + "\n\n");

          // let employee_query = `SELECT * FROM employee 
          // INNER JOIN role ON employee.role_id = role.id
          // INNER JOIN department ON role.department_id = department.id
          // WHERE department.name = "${answers.department}";`

          let query =`SELECT employee.id, employee.first_name, employee.last_name, 
                        role.title, department.name AS department, role.salary,
                        CONCAT( mgr.first_name, " ", mgr.last_Name) AS manager
                        FROM employee
                        INNER JOIN role ON role.id = employee.role_id
                        INNER JOIN department ON role.department_id = department.id
                        LEFT JOIN employee mgr ON employee.manager_id= mgr.id
                        WHERE department_id=${department_id};`;
      
          connection.query(query, function(err, res) {
            if (err) throw err;
            var myTable = tabler.getTable(res);
            console.log(myTable);
            mainMenu();
          });
      
            

      });
    });

}  // end of view Employees by Department

function viewEmployeesByManager() {
      // get a full list of employee names so we can choose who the new employee's manager is by name
      let employee_query = `SELECT * FROM employee;`;
      connection.query(employee_query, function(err, employees) {
        if (err) throw err;
        
        let employeeNames = employees.map(employee=> { return (employee.first_name + " " + employee.last_name) ; });
        
        let questions = [
          {
              name: "name",
              type: "list",
              message: "Which manager?",
              choices: employeeNames
          }];
             // invoke the Inquirer 
      inquirer
      .prompt(questions).then(answers => {
            // The user chose the manager by name, but we need to store the manager_id in the employee table
            let managerIndex = employeeNames.indexOf(answers.name);
            let manager_id = employees[managerIndex].id;

            let query =`SELECT employee.id, employee.first_name, employee.last_name, 
                        role.title, department.name AS department, role.salary,
                        CONCAT( mgr.first_name, " ", mgr.last_Name) AS manager
                        FROM employee
                        INNER JOIN role ON role.id = employee.role_id
                        INNER JOIN department ON role.department_id = department.id
                        LEFT JOIN employee mgr ON employee.manager_id= mgr.id
                        WHERE employee.manager_id=${manager_id};`;
             // let query = `SELECT * FROM employee WHERE manager_id=${manager_id};`;
            connection.query(query, function(err, byM_employees) {
              if (err) throw err;
              var myTable = tabler.getTable(byM_employees);
              console.log(myTable);
              mainMenu();
           });
      });
    });
} // end of view Employees by Manager


function updateEmployeeRole() {
   // get a full list of employee names so we can choose who the new employee's manager is by name
   let employee_query = `SELECT * FROM employee;`;
   connection.query(employee_query, function(err, employees) {
     if (err) throw err;
     
     let employeeNames = employees.map(employee=> { return (employee.first_name + " " + employee.last_name) ; });
     
     let questions = [
       {
           name: "name",
           type: "list",
           message: "Which employee?",
           choices: employeeNames
       }];
          // invoke the Inquirer 
   inquirer
   .prompt(questions).then(answers => {
         // The user chose the manager by name, but we need to store the manager_id in the employee table
         let empIndex = employeeNames.indexOf(answers.name);
         let emp_id = employees[empIndex].id;
          // start by getting a list of roles from the db
          var role_query = `SELECT * FROM role;`;

          connection.query(role_query, function(err, roles) {
              if (err) throw err;
              let roleNames = roles.map(role=>{ return role.title; });
              let rolequestion = [
                {
                    name: "title",
                    type: "list",
                    message: `Which role would you like to assign to ${answers.name}?`,
                    choices: roleNames
                }];

                inquirer
                .prompt(rolequestion).then(roleChoice => {
                  console.log(roleChoice);
                   let roleIndex = roleNames.indexOf(roleChoice.title);
                   let role_id = roles[roleIndex].id;
                   var update_query = `UPDATE employee
                   SET role_id = ${role_id}
                   WHERE id = ${emp_id};`;
                   connection.query(update_query, function(err, updated) {
                    if (err) throw err;
                    console.log("Successfully updated "+ answers.name + " to the role of " + roleChoice.title+".\n");
                    mainMenu();
                   });

                });
             });
        });
  });
} // end of update Employee Role

function updateEmployeeManager() {
  let query = `SELECT * FROM employee;`;
  connection.query(query, function(err, employees) {
    if (err) throw err;
    
    let employeeNames = employees.map(employee=> { return (employee.first_name + " " + employee.last_name) ; });
    
    let questions = [
      {
          name: "name",
          type: "list",
          message: "Which employee?",
          choices: employeeNames
      }];
         // invoke the Inquirer 
  inquirer
  .prompt(questions).then(answers => {
      let empIndex = employeeNames.indexOf(answers.name);
      let emp_id = employees[empIndex].id;

      manager_questions = [
        {
            name: "name",
            type: "list",
            message: `Who is ${answers.name}'s manager?`,
            choices: employeeNames
        }];
          // invoke the Inquirer 
        inquirer
        .prompt(manager_questions).then(newmanager => {
          let mgrIndex = employeeNames.indexOf(newmanager.name);
          let mgr_id = employees[mgrIndex].id;
          var update_query = `UPDATE employee
          SET manager_id = ${mgr_id} WHERE id = ${emp_id};`;
          connection.query(update_query, function(err, updated) {
            if (err) throw err;
            console.log("Successfully updated "+ answers.name + "'s manager to be" + newmanager.name+".\n");
                        mainMenu();
          });
      });
    });
  
  });
     // start by getting a list of roles from the db
     
} // end of update employee manager

function viewAllRoles() {
  let query = `SELECT * FROM role;`;
  connection.query(query, function(err, roles) {
    if (err) throw err;
    
    let roleNames = roles.map(role=>{ return role.title; });
    //let rolesObject = { Roles: roleNames};
    var myTable = tabler.getTable(roleNames);
    console.log(myTable);
    console.log("\n");
    mainMenu();
  });
} // end of View All Roles

function viewAllDepartments() {
  let query = `SELECT * FROM department;`;
  connection.query(query, function(err, depts) {
    if (err) throw err;
    
    let deptNames = depts.map(dept=>{ return dept.name; });
    //let rolesObject = { Roles: roleNames};
    var myTable = tabler.getTable(deptNames);
    console.log(myTable);
    console.log("\n");
    mainMenu();
  });
} // end of View All Roles



  // Add departments, roles, employees
  // View departments, roles, employees
  // Update employee roles
  
  
  // Bonus points if you're able to:
  // Update employee managers
  // View employees by manager
  // Delete departments, roles, and employees
  // View the total utilized budget of a department -- ie the combined salaries of all employees in that department

