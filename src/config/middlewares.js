import  express  from "express";

const middlewares = {
    json: express.json(),
    urlencoded: express.urlencoded({extended : false})
};


export default middlewares;