import { Student } from "./types.js";
import { Response } from "./types.js";
import { getError } from "./functions.js";
import {

} from "./database/queries.js";

export async function createStudent(
    password: string,
    info: Student,
    school_id: number
): Promise<Response> {
    let response = await insertUser("student", password);
    if (!response.success) {
        return {
            success: false,
            error: getError("201", response.error.message),
            response: null,
        };
    }
    const user_id = response.response[1][0]["LAST_INSERT_ID()"];

    response = await insertStudent(user_id, school_id, info.info);
    if (!response.success) {
        await deleteUser(user_id);
        return {
            success: false,
            error: getError("202", response.error.message),
            response: null,
        };
    }
    const student_id = response.response[1][0]["LAST_INSERT_ID()"];

    let createdGuardians = [];
    for (const guardianID of Object.keys(info.guardians)) {
        const guardian = info.guardians[guardianID];
        response = await insertGuardian(student_id, guardian.info);
        if (!response.success) {
            for (const number in createdGuardians) {
                await deleteGuardian(user_id, number);
            }
            await deleteStudent(user_id);
            return {
                success: false,
                error: getError("203", response.error.message),
                response: null,
            };
        }
        createdGuardians.push(guardianID);
    }
    return { success: true, error: getError("000"), response: user_id };
}
