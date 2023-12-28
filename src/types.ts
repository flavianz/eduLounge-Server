export interface Address {
    street: string;
    number: string;
    city: string;
    postal_code: string,
    country: string
}
export interface Contact {
    cellular: string,
    landline: string,
    email: string
}
export interface PersonalInfo {
    first_name: string,
    middle_name: string,
    last_name: string,
    address: Address,
    contact: Contact,
    birth_date: string
}