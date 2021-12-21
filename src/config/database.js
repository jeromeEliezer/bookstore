import { Sequelize } from "sequelize";

import env from './env';


const associateAll = async (models) => {
    Object.values(models).map((model) => model.associate(models));
    console.log('db  est connecter ');
};

const sequelize = new Sequelize(env.database, env.username, env.password,
    {
        dialect: "mysql",
        host: env.host
    });

const db = { sequelize, associateAll };

export default  db;