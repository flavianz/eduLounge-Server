import { dbQuery } from "./postgres.js";
import { decrypt, encrypt } from "./crypto.js";

export async function update(
    table: string,
    rows: string,
    condition_row: string,
    uuid: string,
    values: string[],
    encryptValues = true,
) {
    try {
        await dbQuery(
            `UPDATE accounts.${table} SET ${rows} WHERE ${condition_row}=${uuid}`,
            encryptValues
                ? values.map((value) => {
                      return encrypt(value);
                  })
                : values,
        );
    } catch (e) {
        throw new Error(
            `Failed to update ${rows} of ${table} '${this.uuid}' in database`,
            { cause: e },
        );
    }
}
export async function insert(
    table: string,
    fields: string[],
    uuid: string,
    values: string[],
    encryptValues = true,
) {
    let valuesString: string = "";
    for (let i = 0; i < values.length; i++) {
        valuesString += `$${i + 1}` + (i !== values.length - 1 ? "," : "");
    }
    let fieldsString: string = "";
    for (let i = 0; i < fields.length; i++) {
        fieldsString += fields[i] + (i !== values.length - 1 ? "," : "");
    }
    try {
        await dbQuery(
            `INSERT INTO accounts.${table} (${fields}) VALUES (${valuesString})`,
            [
                uuid,
                ...(encryptValues
                    ? values.map((value) => {
                          return encrypt(value);
                      })
                    : values),
            ],
        );
    } catch (e) {
        throw new Error(`Failed to create ${table} instance in database`, {
            cause: e,
        });
    }
}
export async function select(
    item: string,
    table: string,
    condition_row: string,
    uuid: string,
    decryptValues = true,
): Promise<string> {
    try {
        const result = await dbQuery(
            `SELECT ${item} FROM accounts.${table} WHERE ${condition_row}=$1`,
            [uuid],
        );
        //Check for empty result
        if (result.rows.length === 0) {
            throw new Error(
                `No ${table} found in database with UUID '${uuid}'`,
            );
        }
        return decryptValues
            ? decrypt(result.rows[0][item])
            : result.rows[0][item];
    } catch (e) {
        throw new Error(
            `Failed to get ${item} of ${table} '${uuid}' in database`,
            { cause: e },
        );
    }
}

export async function deleteFrom(
    table: string,
    condition_row: string,
    uuid: string,
) {
    try {
        await dbQuery(
            `DELETE FROM accounts.${table} WHERE ${condition_row}=$1`,
            [uuid],
        );
    } catch (e) {
        throw new Error(
            `Failed to delete ${table} instance '` +
                this.uuid +
                "' from database",
            { cause: e },
        );
    }
}
