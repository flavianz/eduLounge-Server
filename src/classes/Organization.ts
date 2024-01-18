import { generateUUID } from "../database/crypto.js";
import { insert } from "../database/queries.js";
import { DatabaseColumn } from "./DatabaseColumn.js";

export class Organization extends DatabaseColumn {
    constructor(uuid: string) {
        super(uuid, "organizations", "organization_id");
    }
    /** Create an organization in the database
     * @param {string} short The short id-like name, i.e. 'bl' for 'Baselland'
     * @param {string} name The long-form name of the organization, i.e. 'Bildungswesen Baselland'
     * @returns {Promise<Organization>}, a class instance of the created organization in the database
     * */
    static async createOrganization(short: string, name: string) {
        const uuid = generateUUID();
        await insert(
            "organizations",
            ["organization_id", "short", "name"],
            uuid,
            [short, name],
        );
        return new Organization(uuid);
    }

    /** Get the short id of the organization
     * @returns {string}, the short id of the organization
     * */
    async getShort(): Promise<string> {
        return await this.get("short");
    }
    /** Change the short id of the organization
     * @param {string} short the to be set short id
     * */
    async setShort(short: string) {
        await this.set("short", short);
    }
    /** Get the full name of the organization
     * @returns {string | null}, the full name of the organization
     * */
    async getName() {
        return await this.get("name");
    }
    /** Change the full name of the organization
     * @param {string} name the to be set full name
     * */
    async setName(name: string) {
        await this.set("name", name);
    }
}
