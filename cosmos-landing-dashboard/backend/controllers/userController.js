import asyncHandler from "../utils/asyncHandler.js";

export const getUserProfile = asyncHandler(async (req, res)=>{
    res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        data: {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            createdAt: req.user.createdAt
        }
    })
})