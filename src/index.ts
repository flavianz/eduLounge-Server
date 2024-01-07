import { dbQuery } from "./database/postgres.js";

let time = Date.now();

for (let i = 0; i < 1000; i++) {
    await dbQuery(
        "SELECT * FROM accounts.organisations WHERE organisation_id='7368fe39-6c11-4a44-8572-97a2c5de3afc'",
        [],
    );
    await dbQuery(
        "SELECT * FROM accounts.schools WHERE school_id='475487b7-a1f0-4b56-b022-a67b49e771ac'",
        [],
    );
}
console.log("Time 1:", Date.now() - time, "ms");
time = Date.now();

for (let i = 0; i < 1000; i++) {
    await dbQuery(
        "SELECT * FROM accounts.organisations JOIN accounts.schools s on organisations.organisation_id = s.organisation_id WHERE organisations.organisation_id='7368fe39-6c11-4a44-8572-97a2c5de3afc'",
        [],
    );
}
console.log("Time 2:", Date.now() - time, "ms");
