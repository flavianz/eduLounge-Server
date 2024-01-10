import { User } from "./User.js";
import { encrypt, generateUUID, hash } from "../database/crypto.js";
import { insert } from "../database/queries.js";

export class Student extends User {
    constructor(uuid: string) {
        super(uuid, "students");
    }
    /** Create a student in the database
     * @param {string} password The password for the student
     * @param {string} username The username for the student
     * @returns {Teacher}, a class instance of the created student in the database
     * */
    static async createStudent(
        username: string,
        password: string,
    ): Promise<Student> {
        const uuid = generateUUID();
        await insert(
            "students",
            ["user_id", "password", "username"],
            uuid,
            [hash(password), encrypt(username)],
            false,
        );
        return new Student(uuid);
    }
}
