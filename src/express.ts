import express from "express";

const app = express();
app.use(express.json());

app.post("/getSessionToken", function (req, res) {
    const password = req.body.password;
});
export default app;
