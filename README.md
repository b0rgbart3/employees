# MySQL Employee Tracker

This **C**ontent **M**anagement **S**ystem is a command line interface vased solution for managing a company's employees using node, inquirer, and MySQL.

## Table of contents
1. [Demo](#Demo)
2. [Usage](#Usage)
3. [User Story](#UserStory)
4. [Features](#Features)
5. [Technologies](#Technologies)
6. [Database Schema](#DatabaseSchema)
7. [License](#License)
8. [Credits](#Credits)
9. [Badges](#Badges)

<a name="Demo"></a>
## Demo
![Employee Tracker](employee_demo.gif)

<a name="Usage"></a>
## Usage
```sh
node employees
```

<a name="User Story"></a>
## User Story

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

<a name="Database Schema"></a>
## Database Schema

The database schema contains three tables:

![Database Schema](Assets/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

<a name="Features"></a>
## Features

  * Add departments, roles, employees
  * View departments, roles, employees
  * View employees by department
  * View employees by manager**
  * Update employee role
  * Update employee manager**
  * Remove employees **

  **Bonus features

## Features to be added

  * Remove departments, roles
  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department


<a name="Technologies"></a>
## Technologies

  * MySQL npm package
  * InquirerJS npm package
  * Console.Table npm package
  * NODE.js
  * MySQL Database
  * SQL queries with multiple JOINS


<a name='License'></a>
## License
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

<a name="Credits"></a>
## Credits
b0rgBart3
<a name="Badges"></a>
## Badges
 [![Generic badge](https://img.shields.io/badge/made_with-NODE.js-<COLOR>.svg)](https://shields.io/)

**on github:** <a href='github.com/b0rgBart3'>b0rgBart3</a>

[![](https://github.com/b0rgBart3.png?size=90)](https://github.com/remarkablemark)

Email: borgBart3@gmail.com
