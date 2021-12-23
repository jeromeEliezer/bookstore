import dotenv from 'dotenv';
dotenv.config();


const env = {
    port: process.env.PORT || 3,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    jwt_secret: process.env.JWT_SECRET,
    salt_rounds: process.env.SALT_ROUNDS,
    dialect: "mysql",
    seederStorage: "sequelize",
}

export default env;