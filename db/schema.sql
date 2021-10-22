-- Create DataBase --
drop database if exists employee_tracker_db;
CREATE DATABASE employee_tracker_db;

-- Use Database
USE employee_tracker_db;

-- Create Departments Table
CREATE TABLE departments (
  id INT AUTO_INCREMENT,
  dep_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- Create Roles Table
CREATE TABLE roles (
  id INT AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)  REFERENCES departments(id)  ON DELETE SET NULL
);

-- Create Employees Table
drop table if EXISTS employees;
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id int,
  manager_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET null,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);