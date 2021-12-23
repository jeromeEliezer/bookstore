import { Router } from "express";
export default (controller) => {
  const router = Router();

  router.route("/getAll").get(controller.getAll); 
  router.route("/register").post(controller.register);
  router.route("/login").post(controller.login);

  return router;
};
