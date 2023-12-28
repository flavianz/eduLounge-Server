import {encrypt, generateUUID, hash} from "../database/crypto.js";
import {dbQuery} from "../database/postgres.js";
import {PersonalInfo} from "../types.js";
import {encryptObject} from "../functions.js";

export class User{
    readonly uuid: string;

    constructor(uuid: string) {
        this.uuid = uuid;
    }
    /**Create a new user in the database
     * @param {string} password the password for the user
     * @param {PersonalInfo} personalInfo the personal info for the user
     * @returns {User}, the created user class instance
     * */
    static async createUser(password: string, personalInfo: PersonalInfo): Promise<User>
    {
        try {
            const uuid = generateUUID();
            await dbQuery("INSERT INTO accounts.users (user_id, password, personal_info) VALUES ($1, $2, json_populate_record(null::accounts.personal_info, $3))", [uuid, hash(password), JSON.stringify(encryptObject(personalInfo))]);
            return new User(uuid)
        }catch (e) {
            throw new Error("Failed to create user in database", {cause: e})
        }
    }
    /**Get the hashed password of the user
     * @returns {string} the hashed password
     * */
    async getPassword(): Promise<string>
    {
        try
        {
            const result = await dbQuery("SELECT password FROM accounts.users WHERE user_id=$1", [this.uuid])
            //Check for empty result
            if(result.rows.length === 0)
            {
                throw new Error("No user found in database with UUID '" + this.uuid + "'")
            }
            return result.rows[0]["password"];
        }catch (e)
        {
            throw new Error("Failed to get short of organisation '" + this.uuid + "' in database", {cause: e})
        }
    }
    /**Set the password of the user
     * @param {string} password the to be set password
     * */
    async setPassword(password: string)
    {
        try {
            await dbQuery("UPDATE accounts.users SET password=$1 WHERE user_id=$2", [hash(password), this.uuid])
        } catch (e) {
            throw new Error("Failed to update password of user '" + this.uuid + "' in database", {cause: e})
        }
    }

    /**Check if the given password matches the users' password
     * @param {string} password the to be checked password
     * @returns {boolean} if the passwords match
     * */
    async isPassword(password: string): Promise<boolean>
    {
        try {
            return hash(password) === await this.getPassword();
        }catch (e) {
            throw new Error("Failed to compare the passwords", {cause: e})
        }

    }
    /** Delete the user from the database
     * */
    async delete()
    {
        try {
            await dbQuery("DELETE FROM accounts.users WHERE user_id=$1", [this.uuid])
        }catch (e)
        {
            throw new Error("Failed to delete user '" + this.uuid + "' from database", {cause: e})
        }
    }
    /**Get the uuid of the user
     * @returns {string} the uuid of the user
     * */
    getUUID(): string
    {
        return this.uuid;
    }
}