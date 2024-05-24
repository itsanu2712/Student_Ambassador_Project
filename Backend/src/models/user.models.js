import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        uppercase: true
    },
    lastname: {
        type: String,
        uppercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true,
        unique: true
    },
    DOB: {
        type: Date
    },
    companyname: {
        type: String
    },
    upComingEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    role: [{
        type: String,
        
    }],
    otp: {
        type: String
    },
    createdby: {
        type: Date,
        default: Date.now
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true });


// Hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});

// Compare the password with the stored hash
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        role: this.role
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const User = mongoose.model("User", userSchema);