-- fake data
USE employee_tracker_db;

INSERT INTO departments (dep_name)
VALUES ("Sales"),
       ("Engineering"),
       ("IT"),
       ("Social Media");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Manager", 45000, 1),
       ("Senior Engineer", 46000, 2),
       ("Sys Admin", 47000, 3),
       ("Lead Marketer", 48000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, null),
       ("Jenny", "Nicholson", 2, null),
       ("Jarvis", "Johnson", 3, null),
       ("Drew", "Gooden", 4, null);

       
