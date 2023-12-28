import {decrypt, encrypt} from "./database/crypto.js";

/** Generate a random string using the characters a-z, A-Z and 0-9
 * @param {number} length the length of the generated string, default 32
 * @returns {string} the generated string
 * */
function getRandomString(length: number = 32): string {
    let result = "";
    const chars: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

export function encryptObject(obj:object, encryptValues=true): object {
    function modifyValue(value: string): string
    {
        return encryptValues ? encrypt(value) : decrypt(value)
    }
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (Array.isArray(obj[key])) {
                // If the value is an array, modify each element
                obj[key] = obj[key].map((element: any) => {
                    return typeof element === 'object' && element !== null
                        ? encryptObject(element, encryptValues) // Recursively modify nested objects
                        : modifyValue(element); // Modify non-object values
                });
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                // If the value is an object, recursively modify its values
                obj[key] = encryptObject(obj[key], encryptValues);
            } else {
                // Modify the value (you can customize this part based on your requirements)
                obj[key] = modifyValue(obj[key]);
            }
        }
    }
    return obj;
}