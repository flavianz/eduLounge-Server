import pkg from "jsonwebtoken";
const { verify, sign } = pkg;

import dotenv from "./dotenv.js";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { AccessTokenData, RefreshTokenData } from "./types.js";

function decodeAccessToken(accessToken: string): null | AccessTokenData {
    if (!accessToken) {
        return null;
    }
    let result: null | AccessTokenData = null;
    verify(
        accessToken,
        dotenv.jwtAccessSecret,
        (err: Error, decoded: AccessTokenData) => {
            if (err) {
                return;
            }
            result = !decoded.user_id ? null : decoded;
        },
    );
    return result;
}

function decodeRefreshToken(refreshToken: string): null | RefreshTokenData {
    if (!refreshToken) {
        return null;
    }
    let result: null | RefreshTokenData = null;
    verify(
        refreshToken,
        dotenv.jwtRefreshSecret,
        (err: Error, decoded: RefreshTokenData) => {
            if (err) {
                return;
            }
            result = !decoded.user_id ? null : decoded;
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
): null | AccessTokenData {
    if (!req.cookies) {
        res.sendStatus(401);
        return null;
    }
    const accessToken = decodeAccessToken(req.cookies["accessToken"]);
    if (accessToken) {
        return accessToken;
    }
    const refreshToken = decodeRefreshToken(req.cookies["refreshToken"]);
    if (refreshToken) {
        const accessToken = generateNewAccessToken(refreshToken.user_id);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 900000 /* 15m */,
        });
        return decodeAccessToken(accessToken);
    } else {
        res.sendStatus(401);
    }
    return null;
}
