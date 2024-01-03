import { encrypt, generateUUID, decrypt } from "../database/crypto.js";
import { dbQuery } from "../database/postgres.js";
import { DatabaseColumn } from "./DatabaseColumn.js";
import { insert } from "../database/queries.js";

export class School extends DatabaseColumn {
    constructor(uuid: string) {
        super(uuid, "schools", "school_id");
    }

    /** Create a school in the database
     * @param {string} short The short id-like name, i.e. 'sekow' for 'Sekundarschule Oberwil'
     * @param {string} name The long-form name of the organisation, i.e. 'Sekundarschule Oberwil'
     * @param {string} organisationID The id of the organisation the school belongs to
     * @returns {School}, a class instance of the created school in the database
     * */
    static async createSchool(
        short: string,
        name: string,
        organisationID: string,
    ): Promise<School> {
        const uuid = generateUUID();
        await insert(
            "schools",
            ["school_id", "short", "name", "organisation_id"],
            uuid,
            [encrypt(short), encrypt(name), organisationID],
            false,
        );
        return new School(uuid);
    }

    /** Get the short id of the school
     * @returns {string}, the short id of the school
     * */
    async getShort(): Promise<string> {
        return await this.get("short");
    }
    /** Change the short id of the school
     * @param {string} short the to be set short id
     * */
    async setShort(short: string) {
        await this.set("short", short);
    }
    /** Get the full name of the school
     * @returns {string}, the full name of the school
     * */
    async getName() {
        return await this.get("name");
    }
    /** Change the full name of the school
     * @param {string} name the to be set full name
     * */
    async setName(name: string) {
        await this.set("name", name);
    }
}
