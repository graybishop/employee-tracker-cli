import selectMax from "./helper-queries.js";

export const pullDepartmentTable = async (connection, forList) => {
    if(!forList){
        const [rows] = await connection.execute(`
        SELECT 
            dep_name as "Department Name", 
            id as "Dep ID"
        FROM departments;`);
        return rows;
    } else{
        const [rows] = await connection.execute(`
        SELECT 
            id as "value",
            dep_name as "name"
        FROM departments;`);
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
    return await selectMax(connection, 'departments')
};