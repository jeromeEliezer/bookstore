import express  from "express";
import env from "./src/config/env";
import Server from "./src/config/server";
import routes from "./src/modules/index.js";
import middlewares from "./src/config/middlewares";
import db from "./src/config/database";

const http = express();
const server = new Server(http);
server.middlewares(middlewares);
server.routes(routes);      
// server.errorHandler(errorHandler);

(async () => {
    try {
        await db.associateAll(db.sequelize.models)
        console.log("MODEL" ,db.sequelize.models);
        await db.sequelize.sync({alter: true})
        await server.start(env.port);
    } catch (e) {
        console.error(e);
    }
})();