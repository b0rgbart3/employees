// Include console.table to print tables nicely to the console
const tabler = require("console.table");

class Viewing {

    // pass in the db connection 
    constructor(connection) {
        this.connection = connection;
    }

    allEmployees() {
      this.connection.query("SELECT * FROM employee", function(err, res) {
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