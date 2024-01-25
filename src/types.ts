export interface PersonalInfo {
    first_name: string;
    middle_name: string;
    last_name: string;
    street: string;
    number: string;
    city: string;
    apartment: string;
    zip_code: string;
    country: string;
    cellular: string;
    landline: string;
    email: string;
    birth_date: string;
}

export enum Permission {
    Student_readMarks = "student_readownmarks",
}

export interface AccessTokenData extends RefreshTokenData {}

export interface RefreshTokenData {
    user_id: string;
}
