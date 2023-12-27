import {generateUUID, hash} from "../database/crypto.js";
import {dbQuery} from "../database/postgres.js";

export class User {
    readonly uuid: string;

    constructor(uuid: string) {
        this.uuid = uuid;
    }

    static async createUser(password: string)
    {
        try {
            const uuid = generateUUID();
            await dbQuery("INSERT INTO accounts.users (user_id, password) VALUES ($1, $2)", [uuid, hash(password)]);
            return new User(uuid)
        }catch (e) {
            throw new Error("Failed to create user in database", {cause: e})
        }
    }

    async getPassword()
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

    async setPassword(password: string)
    {
        try {
            await dbQuery("UPDATE accounts.users SET password=$1 WHERE user_id=$2", [hash(password), this.uuid])
        } catch (e) {
            throw new Error("Failed to update password of user '" + this.uuid + "' in database", {cause: e})
        }
    }

    async isPassword(password: string)
    {
        try {
            return hash(password) === await this.getPassword();
        }catch (e) {
            throw new Error("Failed to compare the passwords", {cause: e})
        }
    }
}