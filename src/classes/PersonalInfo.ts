import { DatabaseColumn } from "./DatabaseColumn.js";
import { encrypt, generateUUID } from "../database/crypto.js";
import { insert } from "../database/queries.js";
import * as Types from "../types.js";

export class PersonalInfo extends DatabaseColumn {
    constructor(uuid: string) {
        super(uuid, "personal_info", "personal_info_id");
    }

    static async createPersonalInfo(
        personalInfo: Types.PersonalInfo,
        user_id: string,
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
                "user_id",
            ],
            uuid,
            [
                encrypt(personalInfo.first_name),
                encrypt(personalInfo.middle_name),
                encrypt(personalInfo.last_name),
                encrypt(personalInfo.street),
                encrypt(personalInfo.number),
                encrypt(personalInfo.city),
                encrypt(personalInfo.apartment),
                encrypt(personalInfo.zip_code),
                encrypt(personalInfo.country),
                encrypt(personalInfo.cellular),
                encrypt(personalInfo.landline),
                encrypt(personalInfo.email),
                encrypt(personalInfo.birth_date),
                user_id,
            ],
            false,
        );
        return new PersonalInfo(uuid);
    }
}
