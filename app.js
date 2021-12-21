import express  from "express";
import env from "./src/config/env";
import Server from "./src/config/server";
import middlewares from "./src/config/middlewares";
import db from "./src/config/database";

const http = express();
const server = new Server(http);
server.middlewares(middlewares);

// server.start(env.port)
(async () => {
    try {
        await db.associateAll(db.sequelize.models)
        await db.sequelize.sync({alter: true})
        await api.start(env.port);
    } catch (e) {
        console.error(e);
    }
})();