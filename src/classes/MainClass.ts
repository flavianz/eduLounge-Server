import {Class} from "./Class.js";
import {dbQuery} from "../database/postgres.js";
import {generateUUID} from "../database/crypto.js";

export class MainClass extends Class{
    constructor(uuid: string) {
        super(uuid);
    }
    /**Create a new main class in the database
     * @returns {MainClass}, the created class instance
     * */
    static async createMainClass(): Promise<MainClass>
    {
        try {
            const uuid = generateUUID();
            await dbQuery("INSERT INTO accounts.main_classes (class_id) VALUES ($1)", [uuid]);
            return new MainClass(uuid)
        }catch (e) {
            throw new Error("Failed to create main class in database", {cause: e})
        }
    }
}