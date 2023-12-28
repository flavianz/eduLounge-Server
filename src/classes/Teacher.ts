import {User} from "./User.js";
import {PersonalInfo} from "../types.js";
import {generateUUID, hash} from "../database/crypto.js";
import {dbQuery} from "../database/postgres.js";
import {encryptObject} from "../functions.js";

export class Teacher extends User {
    constructor(uuid: string) {
        super(uuid);
    }
    static async createTeacher(password: string, school_id: string, personalInfo: PersonalInfo): Promise<User>
    {
        try {
            const uuid = generateUUID();
            await dbQuery("INSERT INTO accounts.teachers (user_id, password, school_id, personal_info) VALUES ($1, $2, $3, json_populate_record(null::accounts.personal_info, $4))", [uuid, hash(password), school_id, JSON.stringify(encryptObject(personalInfo))]);
            return new Teacher(uuid)
        }catch (e) {
            throw new Error("Failed to create user in database", {cause: e})
        }
    }
}