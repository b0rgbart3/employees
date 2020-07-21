// Include console.table to print tables nicely to the console
const tabler = require("console.table");

class Viewing {

    // pass in the db connection 
    constructor(connection) {
        this.connection = connection;
    }

    allEmployees() {
    
      var fullyJoinedDBQuery = 
      `SELECT employee.first_name, employee.last_name AS e1, role.title, department.name, role.salary,
      CONCAT( mgr.first_name, " ", mgr.last_Name) AS manager
      FROM employee
      INNER JOIN role ON role.id = employee.role_id
      INNER JOIN department ON role.department_id = department.id
      LEFT JOIN employee mgr ON employee.manager_id= mgr.id;`;

      //"SELECT * FROM employee"

      this.connection.query(fullyJoinedDBQuery, function(err, res) {
      if (err) throw err;
        //console.log(res);
        var myTable = tabler.getTable(res);
        console.log(myTable);
       // displayOutput(res);
    });
       // console.log("Got to the view all block.");
    }
}

module.exports = Viewing;