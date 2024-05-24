import Router from "express";
import { registerUser, loginUser ,logoutUser, getCurrentUser} from "../controllers/user.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

// for registering the user
// router.post("/register", upload.single("avatar") , registerUser)
router.route("/register").post(upload.single("avatar"), registerUser)
// for login the user
router.route("/login").post(loginUser)
// for logout the user
router.route("/logout").post(verifyJWT, logoutUser)
// to get the information about current user
router.route("/currentUser").post(verifyJWT, getCurrentUser)

router.post('/refresh-token', async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token is required" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Check if the user exists in the database
        const user = await User.findById(decoded._id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        // Generate a new access token
        const newAccessToken = user.generateAccessToken();

        return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        return res.status(401).json({ message: "Invalid refresh token", data: error.message });
    }
});

export default router;