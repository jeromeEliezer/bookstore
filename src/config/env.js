import dotenv from 'dotenv';
dotenv.config();

const env = {
    app_port: process.env.APP_PORT ? process.env.APP_PORT : 4000
}


export default env;