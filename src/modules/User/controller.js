import ApiError from "../../helpers/apiError";
import bcrypt from 'bcrypt'
import  Jwt  from "jsonwebtoken";

class UserController {
    #models;
    constructor(models) {
        this.#models = models;
    }
    getAll = async (req, res, next) => {
        try {
            const user = req.userID;
            const users = await this.#models.User.findAll();
            res.status(200).json(users)
        } catch (error) {
            console.log(error, "getAllUser");
            next(error);
        }
       
    }

    login = async (req, res, next) => {
        try {
            const { email, password } = { ...req.body };

            if (!email || !password)
                throw new ApiError(403, "missing email or password or both");
                
                const user = await this.#models.User.findOne({ where: { email } });
            if (!user)
                throw new ApiError(403, "user not found");
            const result = await bcrypt.compare(password, user.password);
            if (!result)
                throw new ApiError(403, 'email ou passwor incorrrect');
const token = await Jwt.sign({id: user.id}, env.secret);
res.headers['autorization'] = `Bearer ${token}`
            res.status(200).json('auth sucess');
        } catch (err) {
            next(err);
        }
    }

    register = async (req, res, next ) => {
try {
    
} catch (error) {
    console.log(error);
}
    }





}

export default UserController;