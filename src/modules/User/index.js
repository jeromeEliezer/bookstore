import router from "./router.js";
import UserController from "./UserController.js";
import User from "./UserModel.js";


const controller =   new UserController({User});
const UserRouter  = router(controller);

export default UserRouter;
