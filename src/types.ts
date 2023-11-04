export interface Organisation {
    schools: {
        [key: string]: School;
    };
}

export interface School {
    fullName: string;
    id: string;
    administration: Administration | null;
}

export interface Administration {
    principal: Principal | null;
}

export interface Principal {
    vice: boolean;
}

export interface Response {
    success: boolean;
    error: ErrorType;
    response: any;
}
export type UserType = "student" | "teacher";
export interface ErrorType {
    message: string;
    code: string;
}
export type ErrorCode =
    | "000"
    | "100"
    | "101"
    | "200"
    | "201"
    | "202"
    | "203"
    | "900";

export interface Student {
    id?: number;
    info: StudentInfo;
    guardians: {
        1: Guardian;
        2: Guardian;
        3: Guardian;
    };
}
export interface StudentInfo {
    last_name: string | null;
    first_name: string | null;
    middle_name: string | null;
    postal_code: string | null;
    city: string | null;
    street: string | null;
    house_number: string | null;
    profile: string | null;
    birthday: string | null;
    landline: string | null;
    mobile: string | null;
    hometown: string | null;
    second_hometown: string | null;
    ahv_number: string | null;
    nationality: string | null;
    first_language: string | null;
    email_private: string | null;
    subjects: string;
    school_id?: number;
    user_id?: number;
}

export interface Guardian {
    id?: number;
    student_id?: number;
    info: GuardianInfo;
}
export type GuardianNumber = "1" | "2" | "3";
export interface GuardianInfo {
    number: GuardianNumber;
    first_name: string | null;
    last_name: string | null;
    mobile: string | null;
    email: string | null;
}
