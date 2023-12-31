import pg from "pg";
import dotenv from "../dotenv.js";

const client = new pg.Client({
    connectionString: dotenv.databaseURL,
});

client.connect(() => {
    console.log("Connected");
});

/**Execute a query in the database
 * @param {string} query the sql query to be executed
 * @param {string[]} values the values to be inserted in placed annotated using '$'
 * @returns the query result of the executed query
 * */
export async function dbQuery(
    query: string,
    values?: string[],
): Promise<pg.QueryResult> {
    try {
        return await client.query(query, values);
    } catch (e) {
        throw new Error("Statement failed", { cause: e });
    }
}
