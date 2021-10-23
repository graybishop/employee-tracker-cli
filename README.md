
# employee-tracker-cli

## Description

A command-line application to manage a company's employee database. Using inquirer, this CLI presents the information in an employee database (powered by MySQL) in table format. The User can select from the options given to view, add, and modify records in the database easily.

This tool connects to a local MySQL database to pull and abstract queries for the user so that they may track their employee's and company structure. Install with ```npm install``` and start with ```npm start``` to begin.

## Demo Video

Vid Goes Here.

## Features

### View Records in Table Format

If the user selects ```View All Departments```, ```View All Roles```, or ```View All Employees```, they are presented with a formatted table showing the details of the selected option.

### Add Records to Each Table

```Add a Department```, ```Add a Role```, and ```Add an Employee``` walks the user through adding new records to the appropriate tables. Each finishes by confirming the new record was entered, and showing the ID of the new entry.

### Modify Employee Roles

If the user selects ```Update an Employee's Role``` they are given a list of employee's to choose from, then a list of roles to apply to that employee.

### View Department Budgets

```Show Department Budgets``` presents the user with the total spent on salary for each department.

## Tech Stack

* NodeJS
* Inquirer
* mysql2
* console.table
