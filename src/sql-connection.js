import mysql from 'mysql2/promise';
export * from './dep-queries.js';
export * from './roles-queries.js'
export * from './emp-queries.js'

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

export const endConnection = (connection) => {
    connection.end();
};

