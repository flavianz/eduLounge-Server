import {PersonalInfo} from "../types.js";
import {generateUUID, hash} from "../database/crypto.js";
import {dbQuery} from "../database/postgres.js";
import {encryptObject} from "../functions.js";

export class Class {
    readonly uuid: string;

    constructor(uuid: string) {
        this.uuid = uuid;
    }
    /**Create a new class in the database
     * @returns {Class}, the created class instance
     * */
    static async createUser(): Promise<Class>
    {
        try {
            const uuid = generateUUID();
            await dbQuery("INSERT INTO accounts.classes (class_id) VALUES ($1)", [uuid]);
            return new Class(uuid)
        }catch (e) {
            throw new Error("Failed to create class in database", {cause: e})
        }
    }
    /** Delete the class from the database
     * */
    async delete()
    {
        try {
            await dbQuery("DELETE FROM accounts.classes WHERE class_id=$1", [this.uuid])
        }catch (e)
        {
            throw new Error("Failed to delete class '" + this.uuid + "' from database", {cause: e})
        }
    }
    /**Get the uuid of the user
     * @returns {string} the uuid of the class
     * */
    getUUID(): string
    {
        return this.uuid;
    }
}