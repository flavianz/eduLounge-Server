import { deleteFrom, insert, select, update } from "../database/queries.js";

export class DatabaseColumn {
    private readonly uuid: string;
    private readonly tableName: string;
    private readonly idRow: string;

    constructor(uuid: string, tableName: string, idRow: string) {
        this.uuid = uuid;
        this.tableName = tableName;
        this.idRow = idRow;
    }

    /**Get the value from the provided row
     * @param {string} row the row to get
     * @param {boolean} decrypt if the returned value should be automatically decrypted
     * @returns {Promise<string>} the resulting value
     * */
    async get(row: string, decrypt: boolean = true): Promise<string> {
        return await select(
            row,
            this.tableName,
            this.idRow,
            this.uuid,
            decrypt,
        );
    }

    /**Set the row to the given value
     * @param {string} row the to be set row
     * @param {string} value the to be updated value
     * */
    async set(row: string, value: string) {
        await update(this.tableName, row, this.idRow, this.uuid, [value]);
    }

    /** Delete from the database
     * */
    async delete() {
        await deleteFrom(this.tableName, this.idRow, this.uuid);
    }

    /**Get the uuid
     * @returns {string} the uuid
     * */
    getUUID(): string {
        return this.uuid;
    }
}
