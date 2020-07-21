
USE employee_tracker;

INSERT INTO department ( name )
VALUES ("Sales");

INSERT INTO department ( name )
VALUES ("Engineering");

INSERT INTO department ( name )
VALUES ("Legal");

INSERT INTO department ( name )
VALUES ("Finance");

INSERT INTO role (title, salary, department_id) 
VALUES ("Sales Lead", "100000", 1);

INSERT INTO role (title, salary, department_id) 
VALUES ("Salesperson", "80000", 1);

INSERT INTO role (title, salary, department_id) 
VALUES ("Lead Engineer", "150000", 2);

INSERT INTO role (title, salary, department_id) 
VALUES ("Software Architect", "160000", 2);

INSERT INTO role (title, salary, department_id) 
VALUES ("Software Engineer", "140000", 2);

INSERT INTO role (title, salary, department_id) 
VALUES ("Legal Team Lead", "200000", 3);

INSERT INTO role (title, salary, department_id) 
VALUES ("Lawyer", "180000", 3);

INSERT INTO role (title, salary, department_id) 
VALUES ("Accountant", "90000", 4);

  /* Sales Lead */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null);

  /* Salesperson */
INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES ("Mike", "Chan", 2, 1);

  /* Lead Engineer */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriguez", 3, null);

/* Software Architect */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Brown", 4, 3);
