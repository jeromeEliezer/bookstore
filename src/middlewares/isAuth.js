import jwt from "jsonwebtoken";
import env from "../config/env";
import ApiError from "../helpers/apiError";

const isAuth =  async (res, req, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) 
           throw new ApiError(401, 'missing token' );

           const decoded = await jwt.verify(token, env.secret);
        
           req.userID = decoded.id;
           
           next()

    } catch (error) {
        res.status(401).json(error)
    }
}
export default isAuth;  