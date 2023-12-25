import { ErrorCode, ErrorType, Response } from "./types.js";
import { ErrorCodes } from "./constants.js";
import client from "./database/postgres.js";

export async function dbQuery(query: string, values: string[]): Promise<Response> {
    return await new Promise((resolve) => {
        return  client.query(query, values)
    });
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
