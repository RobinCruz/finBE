const path = require("path");
require("dotenv-safe").config({
    allowEmptyValues: true,
    path: path.join(__dirname, "../.env"),
});

module.exports = {
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbAuthKey: process.env.AUTH_KEY
}