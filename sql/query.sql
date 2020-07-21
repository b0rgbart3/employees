
/* These are my attempts at joinery */

SELECT first_name, last_name, role.title, department.name
FROM employee
INNER JOIN role ON employee.role_id = role.id 
INNER JOIN department ON role.department_id = department.id

SELECT first_name, last_name, role.title, department.name, role.salary
FROM employee
INNER JOIN role ON employee.role_id = role.id 
INNER JOIN department ON role.department_id = department.id;

/*  The full schlameal */

SELECT employee.first_name, employee.last_name, role.title, department.name, role.salary, manager.first_name, manager.last_name
FROM employee
INNER JOIN role ON employee.role_id = role.id 
INNER JOIN department ON role.department_id = department.id
INNER JOIN employee manager ON manager.manager_id = employee.id;


/* Best SELECT */
SELECT employee.first_name, employee.last_name AS e1, role.title, department.name, role.salary,
CONCAT( mgr.first_name, " ", mgr.last_Name) AS manager
FROM employee
INNER JOIN role ON role.id = employee.role_id
INNER JOIN department ON role.department_id = department.id
LEFT JOIN employee mgr ON employee.manager_id= mgr.id;

