// Include console.table to print tables nicely to the console
const tabler = require("console.table");
// Include Inquirer to prompt the user on the command line
const inquirer = require("inquirer");


class Role {

    // pass in the db connection 
    constructor(connection) {
        this.connection = connection;
    }


}

module.exports = Role;