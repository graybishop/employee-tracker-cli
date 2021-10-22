//menu options
// view all departments
// view all roles
// view all employees
// add a department
// add a role
// add an employee,
// update an employee role
// * Application allows users to update employee managers (2 points).
// * Application allows users to view employees by manager (2 points).
// * Application allows users to view employees by department (2 points).
// * Application allows users to delete departments, roles, and employees (2 points for each).
// * Application allows users to view the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department (8 points).

//database set-up
// * `department`

//     * `id`: `INT PRIMARY KEY`

//     * `name`: `VARCHAR(30)` to hold department name

// * `role`

//     * `id`: `INT PRIMARY KEY`

//     * `title`: `VARCHAR(30)` to hold role title

//     * `salary`: `DECIMAL` to hold role salary

//     * `department_id`: `INT` to hold reference to department role belongs to

// * `employee`

//     * `id`: `INT PRIMARY KEY`

//     * `first_name`: `VARCHAR(30)` to hold employee first name

//     * `last_name`: `VARCHAR(30)` to hold employee last name

//     * `role_id`: `INT` to hold reference to employee role

//     * `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)