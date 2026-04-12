import express from "express";
import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import authorization from "../middleware/auth.js";

const router = express.Router();

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1m'
    })
};

// Register
router.post('/register', async (req, res)=>{
    try {
        const {username, email, password} = req.body;

        const userExists = await User.findOne({ email });
        if(userExists){ 
            return res.status(400).json({message: "User already exists."});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        const userPayload = {
            _id: user._id,
            username: user.username,
            email: user.email
        }

        res.status(201).json({user: userPayload, token: generateToken(user._id)})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/login', async (req, res) =>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "User not found! Invalid email."})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const userPayload = {
                _id: user._id,
                username: user.username,
                email: user.email
            }
            return res.status(201).json({user: userPayload, token: generateToken(user._id)})
        }else{
            return res.status(401).json({message: "Login failed! Invalid password."});
        }

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get('/me', authorization, (req,res)=>{
    res.status(200).json(req.user);
})

export default router;