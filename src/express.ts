import express, { raw } from "express";
import cookieParser from "cookie-parser";
import { User } from "./classes/User.js";
import cors from "cors";
import dotenv from "./dotenv.js";
import jwt from "jsonwebtoken";
import {
    checkAccessToken,
    generateNewAccessToken,
    generateNewRefreshToken,
} from "./jwt.js";
import { dbQuery } from "./database/postgres.js";
import { QueryResult } from "pg";
import { decrypt } from "./database/crypto.js";

const { verify } = jwt;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOrigin = {
    origin: "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));

app.get("/logout", (req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });
    res.sendStatus(200);
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: "Missing login credentials" });
        return;
    }
    let uuid: string;
    try {
        uuid = await User.getUuidFromUsername(username);
    } catch (e) {
        res.status(406).json({ message: "Wrong user credentials" });
        return;
    }
    const user = new User(uuid);
    if (!(await user.isPassword(password))) {
        res.status(406).json({ message: "Wrong user credentials" });
        return;
    }
    const accessToken = generateNewAccessToken(uuid);
    const refreshToken = generateNewRefreshToken(uuid);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 900000 /* 15m */,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 2592000000 /* 30 d */,
    });

    return res.sendStatus(200);
});

app.get("/refreshAccessToken", (req, res) => {
    checkAccessToken(req, res);
});

app.post("/students/getMarks", async (req, res) => {
    const user_id = checkAccessToken(req, res);
    const { subject_id } = req.body;
    if (!user_id) {
        return;
    }
    if (!subject_id) {
        //response already sent by checkAccessToken()
        res.sendStatus(406);
    }
    let marks: QueryResult<any>;
    try {
        marks = await dbQuery(
            `SELECT mark_id, mark, mark_weight, m.name, date FROM accounts.marks m 
                        JOIN accounts.subjects s on m.subject_id = s.subject_id WHERE student_id=$1 AND m.subject_id=$2`,
            [user_id, subject_id],
        );
    } catch (e) {
        res.sendStatus(500);
        return;
    }
    res.send(
        marks.rows.map((mark) => {
            return {
                uuid: mark["mark_id"],
                mark: decrypt(mark["mark"]),
                mark_weight: decrypt(mark["mark_weight"]),
                name: decrypt(mark["name"]),
                date: decrypt(mark["date"]),
            };
        }),
    );
});

app.get("/students/getSubjects", async (req, res) => {
    const user = checkAccessToken(req, res);
    const permissionResult = await dbQuery(
        "SELECT accounts.permissions.readownmarks FROM accounts.users u JOIN accounts.users_roles ur on ur.user_id=u.user_id JOIN accounts.roles r on r.role_id=ur.role_id JOIN accounts.permissions p on p.permission_id=r.permission_id or p.permission_id=u.permission_id WHERE u.user_id=$1",
        [user.user_id],
    );
    console.log();
    if (!user) {
        //response already sent by checkAccessToken()
        return;
    }
    let subjects: QueryResult<any>;
    try {
        subjects = await dbQuery(
            `SELECT accounts.subjects.name as name, accounts.subjects.subject_id as subject_id
                        FROM accounts.students s
                        JOIN accounts.students_classes sc ON sc.student_id = s.user_id
                        JOIN accounts.classes c ON sc.class_id = c.class_id
                        INNER JOIN accounts.subjects ON c.subject_id = accounts.subjects.subject_id
                        WHERE s.user_id=$1`,
            [user.user_id],
        );
    } catch (e) {
        res.sendStatus(500);
        return;
    }
    res.send(
        subjects.rows.map((subject) => {
            return {
                name: decrypt(subject["name"]),
                subject_id: subject["subject_id"],
            };
        }),
    );
});

app.get("/testAccessToken", (req, res) => {
    const accessToken = req.cookies["accessToken"];
    verify(
        accessToken,
        dotenv.jwtAccessSecret,
        (err: Error, decoded: object) => {
            if (err || !decoded["user_id"]) {
                res.status(406).json({ message: "refresh token invalid" });
                return;
            }
            res.send(decoded["user_id"]);
        },
    );
});

export default app;
