import  express  from "express";
import cookieParser from 'cookie-parser'

const middlewares = {

    json: express.json(),
    urlencoded: express.urlencoded({extended : false}),
    cookieParser: cookieParser(),
};


export default middlewares;