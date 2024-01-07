/** Generate a random string using the characters a-z, A-Z and 0-9
 * @param {number} length the length of the generated string, default 32
 * @returns {string} the generated string
 * */
function getRandomString(length: number = 32): string {
    let result = "";
    const chars: string =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}
