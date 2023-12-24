import {Client} from "pg";
const client = new Client({host: "localhost", port: 5432, database: "edulounge", user: "flavianzullig", password: ""});
await client.connect();

export default client;