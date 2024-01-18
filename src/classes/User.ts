import { encrypt, generateUUID, hash } from "../database/crypto.js";
import { DatabaseColumn } from "./DatabaseColumn.js";
import { dbQuery } from "../database/postgres.js";
import { insert } from "../database/queries.js";

export class User extends DatabaseColumn {
    constructor(uuid: string, tableName: string = "users") {
        super(uuid, tableName, "user_id");
    }
    /** Create a teacher in the database
     * @param {string} password The password for the user
     * @param {string} username The username for the user
     * @param {string} permissionID The permission ID for the user
     * @returns {User}, a class instance of the created user in the database
     * */
    static async createUser(
        username: string,
        password: string,
        permissionID: string,
    ) {
        const uuid = generateUUID();
        await insert(
            "users",
            ["user_id", "password", "username", "permission_id"],
            uuid,
            [hash(password), encrypt(username), permissionID],
            false,
        );
        return new User(uuid);
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
    /**Get the username of the user
     * @returns {string} the username
     * */
    async getUsername() {
        return await this.get("username");
    }
    /**Set the username of the user
     * @param {string} username the to be set username
     * */
    async setUsername(username: string) {
        await this.set("username", username);
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
}
