import { User } from "./User.js";
import { generateUUID, hash } from "../database/crypto.js";
import { insert } from "../database/queries.js";

export class Teacher extends User {
    constructor(uuid: string) {
        super(uuid);
    }
    static async createTeacher(
        password: string,
        school_id: string,
        personalInfoID: string,
    ): Promise<Teacher> {
        const uuid = generateUUID();
        await insert(
            "teachers",
            ["user_id", "password", "school_id", "personal_info_id"],
            uuid,
            [hash(password), school_id, personalInfoID],
            false,
        );
        return new Teacher(uuid);
    }
}
