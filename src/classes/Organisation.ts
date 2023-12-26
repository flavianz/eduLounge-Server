import {dbQuery} from "../database/postgres.js";
import {decrypt, encrypt, generateUUID} from "../database/crypto.js";

export class Organisation {
    readonly uuid: string
    constructor(uuid: string) {
        this.uuid = uuid;
    }
    /** Create an organisation in the database
    * @param {string} short The short id-like name, i.e. 'bl' for 'Baselland'
    * @param {string} name The long-form name of the organisation, i.e. 'Bildungswesen Baselland'
    * @returns {Organisation}, a class instance of the created organisation in the database
    * */
    static async createOrganisation(short: string, name: string): Promise<Organisation>
    {
        try {
            const uuid = generateUUID();
            await dbQuery("INSERT INTO edulounge.organisations (organisation_id, short, name) VALUES ($1, $2, $3)", [uuid, encrypt(short), encrypt(name)]);
            return new Organisation(uuid)
        }catch (e) {
            throw new Error("Failed to create organisation in database", {cause: e})
        }
    }

    /** Get the short id of the organisation
     * @returns {string}, the short id of the organisation
     * */
    async getShort(): Promise<string>
    {
        try
        {
            const result = await dbQuery("SELECT short FROM edulounge.organisations WHERE organisation_id=$1", [this.uuid])
            //Check for empty result
            if(result.rows.length === 0)
            {
                throw new Error("No organisation found in database with UUID '" + this.uuid + "'")
            }
            return decrypt(result.rows[0]["short"]);
        }catch (e)
        {
            throw new Error("Failed to get short of organisation '" + this.uuid + "' in database", {cause: e})
        }
    }
    /** Change the short id of the organisation
     * @param {string} short the to be set short id
     * */
    async setShort(short: string)
    {
        try {
            await dbQuery("UPDATE edulounge.organisations SET short=$1 WHERE organisation_id=$2", [encrypt(short), this.uuid])
        } catch (e) {
            throw new Error("Failed to update short of organisation '" + this.uuid + "' in database", {cause: e})
        }
    }
    /** Get the full name of the organisation
     * @returns {string}, the full name of the organisation
     * */
    async getName(): Promise<string | null> {
        try
        {
            const result = await dbQuery("SELECT name FROM edulounge.organisations WHERE organisation_id=$1", [this.uuid])
            //Check for empty result
            if(result.rows.length === 0)
            {
                throw new Error("No organisation found with UUID '" + this.uuid + "'")
            }
            return decrypt(result.rows[0]["name"]);
        }catch (e)
        {
            throw new Error("Failed to get name of organisation '" + this.uuid + "' from database", {cause: e})
        }
    }
    /** Change the full name of the organisation
     * @param {string} name the to be set full name
     * */
    async setName(name: string)
    {
        try {
            await dbQuery("UPDATE edulounge.organisations SET name=$1 WHERE organisation_id=$2", [encrypt(name), this.uuid])
        } catch (e) {
            throw new Error("Failed to update name of organisation '" + this.uuid + "' in database", {cause: e})
        }
    }
    /** Delete the organisation from the database
     * */
    async delete()
    {
        try {
            await dbQuery("DELETE FROM edulounge.organisations WHERE organisation_id=$1", [this.uuid])
        }catch (e)
        {
            throw new Error("Failed to delete organisation '" + this.uuid + "' from database", {cause: e})
        }
    }
    /**Get the uuid of the organisation
     * @returns {string} the uuid of the organisation
     * */
    getUUID(): string
    {
        return this.uuid;
    }
}
