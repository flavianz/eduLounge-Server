import { ErrorCode, ErrorType, Response } from "./types.js";
import { decrypt } from "./crypto.js";
import { ErrorCodes } from "./constants.js";
import con from "./database/MySQL.js";

export async function dbQuery(query: string): Promise<Response> {
    return await new Promise((resolve) => {
        return con.query(query, function (error, result) {
            if (error) {
                resolve({
                    success: false,
                    error: getError("100", JSON.stringify(error)),
                    response: [],
                });
            }
            resolve({
                success: true,
                error: getError("100"),
                response: result,
            });
        });
    });
}

export function generateSessionToken(user_id: number) {}
{
    let token = getRandomString();
    while (
        (
            await dbQuery(
                "SELECT user_id FROM session_tokens WHERE id='abc' LIMIT 1"
            )
        ).response.length > 1
    ) {
        token = getRandomString();
    }
    let timestamp = new Date();
    timestamp.setMonth(timestamp.getMonth() + 1, timestamp.getDate());
    await dbQuery(
        "INSERT INTO session_tokens (id, expiration, user_id) " +
            "VALUES ('" +
            token +
            "', '" +
            timestamp.getTime() +
            "', 1)"
    );
}

function getRandomString(): string {
    let result = "";
    const chars =
        "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 32; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

export async function validatePassword(
    userID: string | number,
    password: string
): Promise<Response> {
    const response: Response = await dbQuery(
        "SELECT password FROM users WHERE id=" + userID
    );
    if (!response.success) {
        return {
            success: false,
            error: getError("200"),
            response: false,
        };
    }
    if (response.response.length === 0) {
        return {
            success: false,
            error: getError("100"),
            response: false,
        };
    }
    //@ts-ignore
    const storedPassword = response.response.at(0).password;
    const decryptedPassword = decrypt(storedPassword);
    return {
        success: true,
        error: getError("000"),
        response: decryptedPassword === password,
    };
}

export function getError(code: ErrorCode, additional?: string): ErrorType {
    let message = "";
    if (additional !== undefined) {
        message = ": " + additional;
    }
    return {
        code: code,
        message: ErrorCodes[code] + message,
    };
}
