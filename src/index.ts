import dotenv from "./dotenv.js";
import app from "./express.js";
import { User } from "./classes/User.js";

if (dotenv.express === "true") {
    app.listen(3000, async () => {
        console.log("Listening on port 3000");
    });
}
