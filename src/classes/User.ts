import { encrypt, generateUUID, hash } from "../database/crypto.js";
import { DatabaseColumn } from "./DatabaseColumn.js";
import { dbQuery } from "../database/postgres.js";
import { insert } from "../database/queries.js";
import { Permission } from "../types.js";
import { QueryResult } from "pg";

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
    static async insertUser(
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

    async hasPermissions(
        permissions: Permission[],
    ): Promise<{ [key in Permission]?: boolean }> {
        let selection: string = "";
        for (let i = 0; i < permissions.length; i++) {
            const perm = permissions[i];
            selection += "p." + perm + (i + 1 < permissions.length ? ", " : "");
        }
        let response: QueryResult<any>;
        try {
            response = await dbQuery(
                `SELECT ${selection} FROM accounts.users u 
                JOIN accounts.users_roles ur on ur.user_id=u.user_id JOIN accounts.roles r on r.role_id=ur.role_id 
                JOIN accounts.permissions p on p.permission_id=r.permission_id or p.permission_id=u.permission_id 
                    WHERE u.user_id=$1`,
                [this.getUUID()],
            );
        } catch (e) {
            let result = {};
            for (const perm of permissions) {
                result[perm] = false;
            }
            return result;
        }
        let result: { [key in Permission]?: boolean } = {};
        for (const perm of permissions) {
            result[perm] =
                (response.rows[0] && (response.rows[0][perm] ?? false)) ||
                (response.rows[1] && (response.rows[1][perm] ?? false));
        }
        return result;
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
