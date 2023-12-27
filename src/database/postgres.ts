import pg from "pg";
const client = new pg.Client({
    host: "localhost",
    port: 5432,
    database: "edulounge",
    user: "postgres",
    password: "flazu66.100%",
});
await client.connect();
/**Execute a query in the database
 * @param {string} query the sql query to be executed
 * @param {string[]} values the values to be inserted in placed annotated using '$'
 * @returns the query result of the executed query
 * */
export async function dbQuery(query: string, values?: string[]): Promise<pg.QueryResult> {
    return await new Promise(async (resolve) => {
        try
        {
            resolve(await client.query(query, values))
        }
        catch (e)
        {
            throw new Error("Statement failed", {cause: e})
        }
    });
}