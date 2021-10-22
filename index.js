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
import mysql from 'mysql2/promise'
// eslint-disable-next-line no-unused-vars
import cTable from 'console.table'

const DB = 'employee_tracker_db'

const main = async () => {
    const connection = await mysql.createConnection(
        {
            host:'localhost', 
            user: 'root',
            password: 'blueyellowdonkeysevenkillerbee', 
            database: DB,

    });
    // query database
    const [rows] = await connection.execute('SELECT * FROM roles');

    console.table(rows)
    connection.end()
}

main()