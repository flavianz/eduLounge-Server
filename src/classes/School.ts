import {encrypt, generateUUID, decrypt} from "../database/crypto.js";
import {dbQuery} from "../database/postgres.js";

export class School {
    readonly uuid: string;

    constructor(uuid: string) {
        this.uuid = uuid;
    }

    /** Create a school in the database
     * @param {string} short The short id-like name, i.e. 'sekow' for 'Sekundarschule Oberwil'
     * @param {string} name The long-form name of the organisation, i.e. 'Sekundarschule Oberwil'
     * @param {string} organisationID The id of the organisation the school belongs to
     * @returns {School}, a class instance of the created school in the database
     * */
    static async createSchool(short: string, name: string, organisationID: string): Promise<School>
    {
        try {
            const uuid = generateUUID();
            await dbQuery("INSERT INTO edulounge.schools (school_id, short, name, organisation_id) VALUES ($1, $2, $3, $4)", [uuid, encrypt(short), encrypt(name), organisationID]);
            return new School(uuid)
        }catch (e) {
            throw new Error("Failed to create school in database", {cause: e})
        }
    }

    /** Get the short id of the school
     * @returns {string}, the short id of the school
     * */
    async getShort(): Promise<string>
    {
        try
        {
            const result = await dbQuery("SELECT short FROM edulounge.schools WHERE school_id=$1", [this.uuid])
            //Check for empty result
            if(result.rows.length === 0)
            {
                throw new Error("No school found in database with UUID '" + this.uuid + "'")
            }
            return decrypt(result.rows[0]["short"]);
        }catch (e)
        {
            throw new Error("Failed to get short of school '" + this.uuid + "' in database", {cause: e})
        }
    }
    /** Change the short id of the school
     * @param {string} short the to be set short id
     * */
    async setShort(short: string)
    {
        try {
            await dbQuery("UPDATE edulounge.schools SET short=$1 WHERE school_id=$2", [encrypt(short), this.uuid])
        } catch (e) {
            throw new Error("Failed to update short of school '" + this.uuid + "' in database", {cause: e})
        }
    }
    /** Get the full name of the school
     * @returns {string}, the full name of the school
     * */
    async getName(): Promise<string | null> {
        try
        {
            const result = await dbQuery("SELECT name FROM edulounge.schools WHERE school_id=$1", [this.uuid])
            //Check for empty result
            if(result.rows.length === 0)
            {
                throw new Error("No school found with UUID '" + this.uuid + "'")
            }
            return decrypt(result.rows[0]["name"]);
        }catch (e)
        {
            throw new Error("Failed to get name of school '" + this.uuid + "' from database", {cause: e})
        }
    }
    /** Change the full name of the school
     * @param {string} name the to be set full name
     * */
    async setName(name: string)
    {
        try {
            await dbQuery("UPDATE edulounge.schools SET name=$1 WHERE school_id=$2", [encrypt(name), this.uuid])
        } catch (e) {
            throw new Error("Failed to update name of school '" + this.uuid + "' in database", {cause: e})
        }
    }
    /** Delete the school from the database
     * */
    async delete()
    {
        try {
            await dbQuery("DELETE FROM edulounge.schools WHERE school_id=$1", [this.uuid])
        }catch (e)
        {
            throw new Error("Failed to delete school '" + this.uuid + "' from database", {cause: e})
        }
    }
    /**Get the uuid of the school
     * @returns {string} the uuid of the school
     * */
    getUUID(): string
    {
        return this.uuid;
    }
}