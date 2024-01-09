import { User } from "./User.js";
import { encrypt, generateUUID, hash } from "../database/crypto.js";
import { insert } from "../database/queries.js";

export class Teacher extends User {
    constructor(uuid: string) {
        super(uuid);
    }
    /** Create a teacher in the database
     * @param {string} password The password for the teacher
     * @param {string} school_id The teacher's school's id
     * @param {string} username The username for the teacher
     * @returns {Teacher}, a class instance of the created teacher in the database
     * */
    static async createTeacher(
        password: string,
        school_id: string,
        username: string,
    ): Promise<Teacher> {
        const uuid = generateUUID();
        await insert(
            "teachers",
            ["user_id", "password", "school_id", "username"],
            uuid,
            [hash(password), school_id, encrypt(username)],
            false,
        );
        return new Teacher(uuid);
    }
}
