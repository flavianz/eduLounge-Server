import { Class } from "./Class.js";
import { dbQuery } from "../database/postgres.js";
import { decrypt, encrypt, generateUUID } from "../database/crypto.js";
import { insert } from "../database/queries.js";

export class MainClass extends Class {
    constructor(uuid: string) {
        super(uuid);
    }
    /**Create a new main class in the database
     * @returns {MainClass}, the created class instance
     * */
    static async createMainClass(
        grade: string,
        name: string,
    ): Promise<MainClass> {
        const uuid = generateUUID();
        await insert("main_classes", ["class_id", "grade", "name"], uuid, [
            grade,
            name,
        ]);
        return new MainClass(uuid);
    }
    /** Get the name of the main class
     * @returns {string}, the name of the main class
     * */
    async getName(): Promise<string> {
        return await this.get("name");
    }
    /** Change the name of the main class
     * @param {string} name the to be set name
     * */
    async setName(name: string) {
        return await this.set("name", name);
    }
}
