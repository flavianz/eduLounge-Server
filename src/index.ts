import dotenv from "./dotenv.js";
import app from "./express.js";
import { User } from "./classes/User.js";

if (dotenv.express === "true") {
    app.listen(3000, async () => {
        console.log(await new User("b91ac21e-ab77-4718-a098-75786f7ad50c").hasPermissions(["readownmarks"]))
        console.log("Listening on port 3000");
    });
}
