import { Sequelize } from "sequelize";
import config from './env';

const associateAll = async (models) => {

    await Object.values(models).map((model) => model.associate(models));
};
const sequelize = new Sequelize(
    config.db_name,
    config.db_user,
    config.db_password,
    { dialect: 'mysql', port: config.db_port, host: config.db_host }
);




const db = { sequelize, associateAll };



export default db;