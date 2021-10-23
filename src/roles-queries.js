import selectMax from "./helper-queries.js";

/**
 * Selects all rows in the role table
 * @param {*} connection 
 * @returns table as mysql obj
 */
 export const pullRoleTable = async (connection, forList) => {
    if(!forList){
        const [rows] = await connection.execute(`
        SELECT 
            roles.id AS "Role ID",
            roles.title AS "Role", 
            departments.dep_name AS "Department Name",
            roles.salary AS "Salary" 
        FROM 
            roles 
        INNER JOIN departments on roles.department_id = departments.id;`);
        return rows;
    } else {
        const [rows] = await connection.execute(`
        SELECT 
            roles.id AS "value",
            roles.title AS "name" 
        FROM 
            roles;`);
        return rows;
    }
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
    await connection.execute(`
    INSERT INTO 
        roles (title, salary, department_id)
    VALUES 
        (? , ? , ?)
    `, [title, salary, dep_id]);

    return await selectMax(connection, 'roles')
};