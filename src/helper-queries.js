export const selectMax = async (connection, table) => {
    const [row] = await connection.execute(`
    SELECT
        MAX(id) AS id
    FROM
        ${table}`,)
    return row[0].id;
}

export default selectMax