import { configDotenv } from "dotenv";

configDotenv();

export default {
    encryptKey: process.env.ENCRYPTKEY,
    encryptIV: process.env.ENCRYPTIV,
    express: process.env.EXPRESS,
    databaseURL: process.env.DATABASEURL,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
};
