// Include console.table to print tables nicely to the console
const tabler = require("console.table");
// Include Inquirer to prompt the user on the command line
const inquirer = require("inquirer");
// Include js class for Role
const Role = require("./role");

class Employee {

    // pass in the db connection 
    constructor(connection) {
        this.connection = connection;
    }

    gather() {
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
                default: "",
            },
            {
                name: "manager",
                message: "Manager:",
                default: "",
            }

        ];

        var role = new Role(this.connection);
        var roles = role.getRoles();
      //  console.log(roles);

    }
}


module.exports = Employee;