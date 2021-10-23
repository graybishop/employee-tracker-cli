import selectMax from "./helper-queries.js";

export const pullEmpTable = async (connection, forList) => {
    if (!forList) {
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
        LEFT JOIN employees m on m.id = e.manager_id
        ORDER BY Name;`);
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
 * Adds employee to employee table given role definition object
 * @param {*} connection MySQL connection
 * @param {*} fName first name 
 * @param {*} lName last name
 * @param {*} role_id role id
 * @param {*} manager_id manager id
 * @returns last id inserted into employee table 
 */
export const addEmployee = async (connection, { fName, lName, role_id, manager_id }) => {
    await connection.execute(`
    INSERT INTO 
        employees (first_name, last_name, role_id, manager_id)
    VALUES 
        ( ?, ?, ?, ? )
    `, [fName, lName, role_id, manager_id]);

    return await selectMax(connection, 'employees');
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
