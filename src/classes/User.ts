import { decrypt, encrypt, hash } from "../database/crypto.js";
import { DatabaseColumn } from "./DatabaseColumn.js";
import { dbQuery } from "../database/postgres.js";

export class User extends DatabaseColumn {
    constructor(uuid: string) {
        super(uuid, "users", "user_id");
    }
    /**Get the uuid of a specific username
     * @param {string} username the username to get uuid from
     * @returns {Promise<string>} the uuid
     * */
    static async getUuidFromUsername(username: string): Promise<string> {
        try {
            const result = await dbQuery(
                `SELECT user_id FROM accounts.users WHERE username=$1`,
                [encrypt(username)],
            );
            //Check for an empty result
            if (result.rows.length === 0) {
                throw new Error(
                    `No user found in database with username '${username}'`,
                );
            }
            return result.rows[0]["user_id"];
        } catch (e) {
            throw new Error(
                `Failed to get username of user '${username}' in database`,
                { cause: e },
            );
        }
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
