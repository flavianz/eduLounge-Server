import {configDotenv} from "dotenv";
configDotenv()
const key = Buffer.from(process.env.ENCRYPTKEY, "latin1");
const iv = Buffer.from(process.env.ENCRYPTIV, "latin1");
import { createCipheriv, createDecipheriv } from "crypto";


export function encrypt(string: string): string {
    const cipher = createCipheriv("aes256", key, iv);
    return (
        cipher.update(string.toString(), "utf8", "hex") + cipher.final("hex")
    );
}

export function decrypt(string: string): string {
    const decipher = createDecipheriv("aes256", key, iv);
    return (
        decipher.update(string.toString(), "hex", "utf-8") +
        decipher.final("utf8")
    );
}
