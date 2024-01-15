import { dbQuery } from "../database/postgres.js";

export class TableJunction {
    private readonly tableName: string;
    private readonly firstTable: { name: string; idRow: string };
    private readonly secondTable: { name: string; idRow: string };
    private readonly firstUUID: string;
    private readonly secondUUID: string;

    constructor(
        tableName: string,
        firstTable: { name: string; idRow: string },
        secondTable: { name: string; idRow: string },
        firstUUID: string,
        secondUUID: string,
    ) {
        this.tableName = tableName;
        this.firstTable = firstTable;
        this.secondTable = secondTable;
        this.firstUUID = firstUUID;
        this.secondUUID = secondUUID;
    }

    async create() {
        await dbQuery(
            `INSERT INTO accounts.${this.tableName} (${this.firstTable.idRow}, ${this.secondTable.idRow}) VALUES (${this.firstUUID})`,
        );
    }

    async delete() {
        await dbQuery(
            `DELETE
             FROM accounts.${this.tableName}
             WHERE ${this.firstTable.idRow} = $1
               AND ${this.secondTable.idRow} = $2`,
            [this.firstUUID, this.secondUUID],
        );
    }
}
