import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are required.")
    }

    const userExists = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (userExists) {
        res.status(400);
        throw new Error("Username or email already exists.")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    const token = generateToken(user);

    res.status(201).json({
        success: true,
        message: "User registration successful",
        data: {
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }
    })
})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error("Email and password are required.")
    }

    // to explain more deeper
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        res.status(401);
        throw new Error("Wrong email or password.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid email or password.")
    }

    const token = generateToken(user);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }
    })
})