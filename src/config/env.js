import dotenv from 'dotenv';
dotenv.config();

const env = {
    app_port: process.env.app_port ? process.env.app_port : 4000,
    db_name: process.env.db_name,
    db_user: process.env.db_user,
    db_password: process.env.db_password,
    db_host: process.env.db_host,
    secret: process.env.secret,
}

export default env;