import { DatabaseColumn } from "./DatabaseColumn.js";
import { generateUUID } from "../database/crypto.js";
import { insert } from "../database/queries.js";
import * as Types from "../types.js";

export class PersonalInfo extends DatabaseColumn {
    constructor(uuid: string) {
        super(uuid, "personal_info", "personal_info_id");
    }

    static async createPersonalInfo(
        personalInfo: Types.PersonalInfo,
        user_id: string
    ): Promise<PersonalInfo> {
        const uuid = generateUUID();
        await insert(
            "personal_info",
            [
                "personal_info_id",
                "first_name",
                "middle_name",
                "last_name",
                "street",
                "number",
                "city",
                "apartment",
                "zip_code",
                "country",
                "cellular",
                "landline",
                "email",
                "birth_date",
                "user_id"
            ],
            uuid,
            [
                personalInfo.first_name,
                personalInfo.middle_name,
                personalInfo.last_name,
                personalInfo.street,
                personalInfo.number,
                personalInfo.city,
                personalInfo.apartment,
                personalInfo.zip_code,
                personalInfo.country,
                personalInfo.cellular,
                personalInfo.landline,
                personalInfo.email,
                personalInfo.birth_date,
                user_id
            ],
        );
        return new PersonalInfo(uuid);
    }
}
