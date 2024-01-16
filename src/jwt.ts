import pkg from "jsonwebtoken";
const { verify, sign } = pkg;

import dotenv from "./dotenv.js";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";

function isValidRefreshToken(refreshToken: string): false | string {
    if (!refreshToken) {
        return false;
    }
    let result: false | string = false;
    verify(
        refreshToken,
        dotenv.jwtRefreshSecret,
        (err: Error, decoded: object) => {
            result = err || !decoded["user_id"] ? false : decoded["user_id"];
        },
    );
    return result;
}

function isValidAccessToken(accessToken: string): false | string {
    if (!accessToken) {
        return false;
    }
    let result: false | string = false;
    verify(
        accessToken,
        dotenv.jwtAccessSecret,
        (err: Error, decoded: object) => {
            result = err || !decoded["user_id"] ? false : decoded["user_id"];
        },
    );
    return result;
}

export function generateNewAccessToken(user_id: string) {
    return sign({ user_id: user_id }, dotenv.jwtAccessSecret, {
        expiresIn: "15m",
    });
}
export function generateNewRefreshToken(user_id: string) {
    return sign({ user_id: user_id }, dotenv.jwtRefreshSecret, {
        expiresIn: "30d",
    });
}

export function checkAccessToken(
    req: Request<{}, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>, number>,
): false | string {
    if (!req.cookies) {
        res.sendStatus(401);
    }
    let user = isValidAccessToken(req.cookies["accessToken"]);
    if (user) {
        return user;
    }
    user = isValidRefreshToken(req.cookies["refreshToken"]);
    if (user && typeof user !== "boolean") {
        const accessToken = generateNewAccessToken(user);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 900000 /* 15m */,
        });
        return user;
    }
    res.sendStatus(401);
    return false;
}
