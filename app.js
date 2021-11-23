import express  from "express";
import env from "./src/config/env";
import Server from "./src/config/server";
import middlewares from "./src/config/middlewares";

const http = express();
const server = new Server(http);
server.middlewares(middlewares);

server.start(env.app_port)