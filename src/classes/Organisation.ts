import { generateUUID } from "../database/crypto.js";
import { insert } from "../database/queries.js";
import { DatabaseColumn } from "./DatabaseColumn.js";

export class Organisation extends DatabaseColumn {
    constructor(uuid: string) {
        super(uuid, "organisations", "organisation_id");
    }
    /** Create an organisation in the database
     * @param {string} short The short id-like name, i.e. 'bl' for 'Baselland'
     * @param {string} name The long-form name of the organisation, i.e. 'Bildungswesen Baselland'
     * @returns {Promise<Organisation>}, a class instance of the created organisation in the database
     * */
    static async createOrganisation(short: string, name: string) {
        const uuid = generateUUID();
        await insert(
            "organisations",
            ["organisation_id", "short", "name"],
            uuid,
            [short, name],
        );
        return new Organisation(uuid);
    }

    /** Get the short id of the organisation
     * @returns {string}, the short id of the organisation
     * */
    async getShort(): Promise<string> {
        return await this.get("short");
    }
    /** Change the short id of the organisation
     * @param {string} short the to be set short id
     * */
    async setShort(short: string) {
        await this.set("short", short);
    }
    /** Get the full name of the organisation
     * @returns {string | null}, the full name of the organisation
     * */
    async getName() {
        return await this.get("name");
    }
    /** Change the full name of the organisation
     * @param {string} name the to be set full name
     * */
    async setName(name: string) {
        await this.set("name", name);
    }
}
