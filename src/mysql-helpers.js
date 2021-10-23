import mysql from 'mysql2/promise';
// eslint-disable-next-line no-unused-vars
import cTable from 'console.table';

const DB = 'employee_tracker_db';

/**
 * creates connection to mysql employee_tracker_db
 * @returns mysql connection
 */
export const startConnection = async () => {
    const connection = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'blueyellowdonkeysevenkillerbee',
            database: DB,
        });
    return connection;
};

export const pullDepartmentTable = async (connection) => {
    const [rows] = await connection.execute(`
    SELECT 
        dep_name as "Department Name", 
        id as "Dep ID"
    FROM departments;`);
    return rows;
};

/**
 * Selects all rows in the role table
 * @param {*} connection 
 * @returns table as mysql obj
 */
export const pullRoleTable = async (connection) => {
    const [rows] = await connection.execute(`
    SELECT 
        roles.id AS "Role ID",
        roles.title AS "Role", 
        departments.dep_name AS "Department Name" 
    FROM 
        roles 
    INNER JOIN departments on roles.department_id = departments.id;`);
    return rows;
};

export const pullEmpTable = async (connection, forList) => {
    if(!forList){
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
    } else {
        const [rows] = await connection.execute(`
        SELECT
            e.id as value, 
            CONCAT(e.first_name,' ',e.last_name) AS name
        FROM 
            employees e 
        INNER JOIN roles ON e.role_id = roles.id 
        INNER JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees m on m.id = e.manager_id;`);
        return rows;
    }
};

/**
 * Given a connection and a department name, adds the department to the dep
 * table, and returns the id of the new department
 * @param {*} connection mysql connection
 * @param {*} newDepartment name of the new department
 * @returns the id of the newly added row. (a number)
 */
export const addDepartment = async (connection, newDepartment) => {
    await connection.execute(`
    INSERT INTO 
        departments (dep_name)
    VALUES 
        (?)
    `, [newDepartment]);

    const [row] = await connection.execute(`
    SELECT
        id
    FROM
        departments
    WHERE
        dep_name = ?`,[newDepartment])
    return row[0].id;
};

/**
 * Adds role to roles table given role definition object
 * @param {*} connection MySQL connection
 * @param {*} title role title 
 * @param {*} salary role salary
 * @param {*} dep_id role department
 * @returns ResultSetHeader
 */
export const addRole = async (connection, { title, salary, dep_id }) => {
    const response = await connection.execute(`
    INSERT INTO 
        roles (title, salary, department_id)
    VALUES 
        (? , ? , ?)
    `, [title, salary, dep_id]);
    return response;
};

/**
 * Adds employee to employee table given role definition object
 * @param {*} connection MySQL connection
 * @param {*} fName first name 
 * @param {*} lName last name
 * @param {*} role_id role id
 * @param {*} manager_id manager id
 * @returns ResultSetHeader
 */
export const addEmployee = async (connection, { fName, lName, role_id, manager_id }) => {
    const response = await connection.execute(`
    INSERT INTO 
        employees (first_name, last_name, role_id, manager_id)
    VALUES 
        ( ?, ?, ?, ? )
    `, [fName, lName, role_id, manager_id]);
    return response;
};

export const updateEmpRole = async (connection, empID, newRoleID) => {
    const response = await connection.execute(
        `UPDATE 
            employees
        SET 
            role_id = ? 
        WHERE 
            id = ?;`, [newRoleID, empID]);
    return response;
};

export const endConnection = (connection) => {
    connection.end();
};

export const main = async () => {
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
    // await addEmployee(connection, {fName:'Simon', lName:'Lane', role_id: 5, manager_id: 3})
    // let empTableAfterInsert = await pullEmpTable(connection);
    // console.table(empTableAfterInsert);
    // await updateEmpRole(connection, 3, 3)
    // empTable = await pullEmpTable(connection);
    // console.table(empTable);

    endConnection(connection);
};

const exports = { main };

export default exports;

