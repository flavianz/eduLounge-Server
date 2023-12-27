import {configDotenv} from "dotenv";
import {v4 as UUIDv4} from "uuid";

configDotenv()
const key = process.env.ENCRYPTKEY
const iv = process.env.ENCRYPTIV
import crypto, {createHash} from "node:crypto";

/**Get the string encrypted using the AES 256 CBC algorithm
 * @param {string} string the to be encrypted string
 * @returns {string} the encrypted string
 * */
export function encrypt(string: string): string {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    return Buffer.from(
        cipher.update(string, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64')
}

/**Get the string decrypted using the AES 256 CBC algorithm
 * @param {string} string the to be decrypted string
 * @returns {string} the decrypted string
 * */
export function decrypt(string: string): string {
    const buff = Buffer.from(string, 'base64')
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv)
    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    )
}

/**Get a hashed version of the provided string, used for passwords
 * @param {string} string the string to be hashed
 * @returns {string} the created hash
 * */
export function hash(string: string): string {
    return createHash('sha3-256').update(string).digest('hex')
}

/**Get a semi-randomly generated uuid
 * @returns {string} the generated uuid
 * */
export function generateUUID(): string
{
    return UUIDv4();
}