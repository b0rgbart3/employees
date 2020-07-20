DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id int,
  manager_id int,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  title VARCHAR(30) NULL,
  salary DECIMAL,
  department_id int
);

CREATE TABLE department(
  last_name VARCHAR(30) NULL
);