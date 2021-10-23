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
        dep_name as "Department Name", 
        id as "Dep ID"
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

const addDepartment = async (connection, newDepartment) => {
    const response = await connection.execute(`
    INSERT INTO 
        departments (dep_name)
    VALUES 
        (?)
    `, [newDepartment])
    return response
}

/**
 * Adds role to roles table given role definition object
 * @param {*} connection MySQL connection
 * @param {*} title role title 
 * @param {*} salary role salary
 * @param {*} dep_id role department
 * @returns ResultSetHeader
 */
const addRole = async (connection, {title, salary, dep_id}) => {
    const response = await connection.execute(`
    INSERT INTO 
        roles (title, salary, department_id)
    VALUES 
        (? , ? , ?)
    `, [title, salary, dep_id])
    return response
}

/**
 * Adds employee to employee table given role definition object
 * @param {*} connection MySQL connection
 * @param {*} fName first name 
 * @param {*} lName last name
 * @param {*} role_id role id
 * @param {*} manager_id manager id
 * @returns ResultSetHeader
 */
const addEmployee = async (connection, {fName, lName, role_id, manager_id}) => {
    const response = await connection.execute(`
    INSERT INTO 
        employees (first_name, last_name, role_id, manager_id)
    VALUES 
        ( ?, ?, ?, ? )
    `, [fName, lName, role_id, manager_id])
    return response
}

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
    // await addDepartment(connection, 'Head Office')
    // let depTableAfterInsert = await pullDepartmentTable(connection);
    // console.table(depTableAfterInsert);
    // await addRole(connection, {title:'IT Guy', salary:30000, dep_id: 3})
    // let rolesTableAfterInsert = await pullRoleTable(connection);
    // console.table(rolesTableAfterInsert);
    await addEmployee(connection, {fName:'Simon', lName:'Lane', role_id: 5, manager_id: 3})
    let empTableAfterInsert = await pullEmpTable(connection);
    console.table(empTableAfterInsert);

    endConnection(connection);
};

const exports = { main };

export default exports;
