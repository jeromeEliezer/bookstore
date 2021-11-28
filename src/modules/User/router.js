import { Router } from "express";
import controller from "./controller";
// import  

export default (controller) => {

    const router = Router();
    router.route('/login').post(controller.login);
    router.route('/register').post(controller.login);
    router.route('/').get(controller.getAll);



    return router;
}