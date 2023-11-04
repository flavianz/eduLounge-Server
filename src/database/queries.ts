import { encrypt } from "../crypto.js";
import { GuardianInfo, StudentInfo, UserType } from "../types.js";
import { dbQuery } from "../functions.js";

function IDfy(info: object) {
    let ids = "";
    for (const key of Object.keys(info)) {
        const value = info[key];
        if (value !== null && value !== undefined) {
            ids += key + ", ";
        }
    }
    return ids;
}
function valueify(info: object) {
    let values = "";
    for (const key of Object.keys(info)) {
        let value = info[key];
        if (value !== null && value !== undefined) {
            value = encrypt(value);
            values += typeof value === "number" ? value + ", " : `'${value}', `;
        }
    }
    return values;
}

export async function insertUser(type: UserType, password: string) {
    return await dbQuery(
        `INSERT INTO users (type, password) VALUES ('${type}', '${encrypt(
            password
        )}'); SELECT LAST_INSERT_ID();`
    );
}

export async function insertStudent(
    user_id: number,
    school_id: number,
    info: StudentInfo
) {
    const ids = IDfy(info);
    const values = valueify(info);
    const query = `INSERT INTO students (${ids} user_id, school_id) VALUES (${values} ${user_id}, ${school_id}); SELECT LAST_INSERT_ID()`;
    return await dbQuery(query);
}

export async function insertGuardian(student_id: number, info: GuardianInfo) {
    const ids = IDfy(info);
    const values = valueify(info);
    return await dbQuery(
        `INSERT INTO guardians (${ids} student_id) VALUES (${values} ${student_id})`
    );
}

export async function deleteUser(user_id: number) {
    return await dbQuery(`DELETE FROM users WHERE id=${user_id}`);
}
export async function deleteStudent(user_id: number) {
    return await dbQuery(`DELETE FROM students WHERE id=${user_id}`);
}
export async function deleteGuardian(user_id: number, number: string) {
    return await dbQuery(
        `DELETE FROM guardian WHERE id=${user_id} AND number = ${number}`
    );
}
