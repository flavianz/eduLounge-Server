import pkg from "jsonwebtoken";
const { verify, sign } = pkg;

import dotenv from "./dotenv.js";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";

function isValidRefreshToken(refreshToken: string): boolean | string {
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

function isValidAccessToken(accessToken: string): boolean | string {
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

function generateNewAccessToken(user_id: string) {
    return sign({ user_id: user_id }, dotenv.jwtAccessSecret, {
        expiresIn: "15m",
    });
}
function generateNewRefreshToken(user_id: string) {
    return sign({ user_id: user_id }, dotenv.jwtRefreshSecret, {
        expiresIn: "30d",
    });
}

export function checkAccessToken(
    req: Request<{}, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>, number>,
): boolean {
    if (!req.cookies) {
        return false;
    }
    if (isValidAccessToken(req.cookies["accessToken"])) {
        return true;
    }
    const user = isValidRefreshToken(req.cookies["refreshToken"]);
    if (user && typeof user !== "boolean") {
        const accessToken = generateNewAccessToken(user);
        res.cookie("accessToken", accessToken);
        return true;
    }
    res.sendStatus(401);
}
