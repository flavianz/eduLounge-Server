import express from "express";
import cookieParser from "cookie-parser";
import { User } from "./classes/User.js";
import cors from "cors";
import dotenv from "./dotenv.js";
import jwt from "jsonwebtoken";
import { checkAccessToken } from "./jwt.js";
const { sign, verify } = jwt;

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
const accessSecret = dotenv.jwtAccessSecret;
const refreshSecret = dotenv.jwtRefreshSecret;

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
    const accessToken = sign({ user_id: uuid }, accessSecret, {
        expiresIn: "15m",
    });
    const refreshToken = sign({ user_id: uuid }, refreshSecret, {
        expiresIn: "30d",
    });
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
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
        res.status(400).json({ message: "Missing refresh token cookie" });
        return;
    }
    verify(
        refreshToken,
        dotenv.jwtRefreshSecret,
        (err: Error, decoded: object) => {
            if (err || !decoded["user_id"]) {
                res.status(406).json({ message: "refresh token invalid" });
                return;
            }
            const accessToken = sign(
                { user_id: decoded["user_id"] },
                accessSecret,
                {
                    expiresIn: "15m",
                },
            );
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
                maxAge: 900000 /* 15m */,
            });
            res.sendStatus(200);
        },
    );
});

app.get("/getMarks", (req, res) => {
    const loggedIn = checkAccessToken(req, res);
    if(!loggedIn)
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
