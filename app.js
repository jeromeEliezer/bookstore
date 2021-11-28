import express  from "express";
import env from "./src/config/env";
import Server from "./src/config/server";
import middlewares from "./src/config/middlewares";
import routes from './src/modules';
import errorHandler from "./src/middlewares/errorHandler";
import db from "./src/config/database";

const http = express();
const server = new Server(http);
server.middlewares(middlewares);
server.routes(routes);
server.errorHandler(errorHandler);

(async () => {
    try {
        await db.associateAll(db.sequelize.models);
        console.log('Connection has been established successfully.');
        await server.start(env.app_port);
      } catch (error) {
        console.log('Unable to connect to the database:', error);
      }
})();
