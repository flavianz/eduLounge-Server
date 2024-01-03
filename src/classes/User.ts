import { hash } from "../database/crypto.js";
import { DatabaseColumn } from "./DatabaseColumn.js";

export class User extends DatabaseColumn {
    constructor(uuid: string) {
        super(uuid, "users", "user_id");
    }
    /**Get the hashed password of the user
     * @returns {string} the hashed password
     * */
    async getPassword(): Promise<string> {
        return await this.get("password", false);
    }
    /**Set the password of the user
     * @param {string} password the to be set password
     * */
    async setPassword(password: string) {
        await this.set("password", password);
    }

    /**Check if the given password matches the users' password
     * @param {string} password the to be checked password
     * @returns {boolean} if the passwords match
     * */
    async isPassword(password: string): Promise<boolean> {
        try {
            return hash(password) === (await this.getPassword());
        } catch (e) {
            throw new Error("Failed to compare the passwords", { cause: e });
        }
    }
    /** Delete the user from the database
     * */
}
