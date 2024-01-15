import { encrypt, generateUUID } from "../database/crypto.js";
import { DatabaseColumn } from "./DatabaseColumn.js";
import { insert } from "../database/queries.js";
export class Class extends DatabaseColumn {
    constructor(uuid: string) {
        super(uuid, "classes", "class_id");
    }
    /**Create a new class in the database
     * @param {string} grade the grade the class is in
     * @param {(string | Student)[]} students the students attending the classes
     * @param {string} teacher the teacher of the class
     * @returns {Class}, the created class instance
     * */
    static async createClass(
        grade: string,
        students: string[],
        teacher: string,
    ): Promise<Class> {
        const uuid = generateUUID();
        await insert(
            "classes",
            ["class_id", "grade", "teacher_id"],
            uuid,
            [encrypt("grade"), teacher],
            false,
        );
        return new Class(uuid);
    }
    /** Get the grade of the class
     * @returns {string}, the grade of the class
     * */
    async getGrade(): Promise<string> {
        return await this.get("grade");
    }
    /** Change the grade of the class
     * @param {string} short the to be set grade
     * */
    async setGrade(short: string) {
        await this.set("short", short);
    }
    /**Get the uuid of the user
     * @returns {string} the uuid of the class
     * */
}
