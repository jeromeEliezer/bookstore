import UserController from "./controller";
import User from "./model";

const models = {User};
const controller = new UserController(models);
const router = router(controller);

export default router;