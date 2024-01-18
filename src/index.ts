import dotenv from "./dotenv.js";
import app from "./express.js";
import { encrypt } from "./database/crypto.js";
console.log(encrypt("student"));
if (dotenv.express === "true") {
    app.listen(3000, async () => {
        console.log("Listening on port 3000");
    });
}
