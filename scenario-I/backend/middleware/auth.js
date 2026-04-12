import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const protect = async (req, res, next) =>{
    let token;

    if(req.headers.authorization?.startsWith("Bearer")){
        try {

            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();

        } catch (error) {
            return res.status(403).json({mssg: "Token failed!"});
        } 
    }else {
        return res.status(401).json({mssg: "No Token!"});
    }
};

export default protect;