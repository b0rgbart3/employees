// Include console.table to print tables nicely to the console
const tabler = require("console.table");
// Include Inquirer to prompt the user on the command line
const inquirer = require("inquirer");


class Role {

    // pass in the db connection 
    constructor(connection) {
        this.connection = connection;
        this.roleList = [];
    }

    async queryRoles() {
        var query = `SELECT role.title FROM employee_tracker.role;`;

        await this.connection.query(query, function(err, res) {
            if (err) throw err;

            var newList =  res.map( packet => { return packet.title });
       
            this.roleList = newList;
        });
        console.log(this.roleList);
      

    }
    async getRoles() {
        await this.queryRoles();
      //  console.log(this.roleList);
    }

}

module.exports = Role;