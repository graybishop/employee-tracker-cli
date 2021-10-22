import mysql from 'mysql2/promise';
// eslint-disable-next-line no-unused-vars
import cTable from 'console.table';

const DB = 'employee_tracker_db';

const startConnection = async () => {
    const connection = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'blueyellowdonkeysevenkillerbee',
            database: DB,
        });
    return connection;
};

const pullDepartmentTable = async (connection) => {
    const [rows] = await connection.execute(`
    SELECT 
        dep_name as "Department Name" 
    FROM departments;`);
    return rows;
};

const pullRoleTable = async (connection) => {
    const [rows] = await connection.execute(`
    SELECT 
        roles.title AS "Role", 
        departments.dep_name AS "Department Name" 
    FROM 
        roles 
    INNER JOIN departments on roles.department_id = departments.id;`);
    return rows;
};

const pullEmpTable = async (connection) => {
    const [rows] = await connection.execute(`
    SELECT
        e.id, 
        CONCAT(e.first_name,' ',e.last_name) AS Name,
        roles.title, 
        roles.salary, 
        departments.dep_name,
        CONCAT(m.first_name,' ',m.last_name) AS Manager
    FROM 
        employees e 
    INNER JOIN roles ON e.role_id = roles.id 
    INNER JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees m on m.id = e.manager_id;`);
    return rows;
};

const endConnection = (connection) => {
    connection.end();
};

const main = async () => {
    const connection = await startConnection();

    let depTable = await pullDepartmentTable(connection);
    console.table(depTable);
    let roleTable = await pullRoleTable(connection);
    console.table(roleTable);
    let empTable = await pullEmpTable(connection);
    console.table(empTable);
    endConnection(connection);
};

const exports = { main };

export default exports;

