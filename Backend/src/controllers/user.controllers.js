import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import bcrypt from "bcrypt"
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";


const getAccessAndRefreshToken = async function (id) {
    // fetch the user
    try {
        const user = await User.findById(id);
        console.log(user);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        console.log(accessToken + "" + refreshToken)

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        console.log("hi")
        return { accessToken, refreshToken }
    } catch (error) {
        // res.status(500).json({message: "Something went wrong while generating referesh and access token"})
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
        console.log(error);
    }

}

const registerUser = async (req, res) => {

    // check if the image (avatar) is there or not
    console.log(req.file);
    if(!req.file) {
        res.status(400).json({message: "Please upload the image"})
    }

    const avatarLocalPath = req.file?.path;
    //console.log(avatarLocalPath);

    const { username, email, password, firstname, lastname, phonenumber, role } = req.body;
    console.log(phonenumber, firstname)
    // validations
    if (!(username && email && password && firstname && lastname && phonenumber, role)) {
       return res.status(400).json({ message: "All fields are required" })
    }

    // if the user is existed or not
    const existedUser = await User.findOne({
        $or: [{ username }, { email }, { phonenumber}]
    })

    if (existedUser) {
        res.status(400).json({ message: "User already exists" })
        return;
    }

    const fileName = req.file.originalname;
    const response = await uploadFileOnCloudinary(`\public\\temp\\${fileName}`);
    // const avatar = await uploadOnCloudinary(avatarLocalPath)
    //console.log(response)

    if (!response.url) {
        res.status(500).json({ message: "Something went wrong while uploading the image" })
    }
    
    // to create the user with the given username and password
    await User.create({
        username: username.toLowerCase(),
        email,
        password,
        avatar: response.url,
        firstname,
        lastname,
        phonenumber: phonenumber.toString(),
        role
    }).then((result) => {
        const user = result
        res.status(201).json({ data: user, message: "User created Successfully" })
    }).catch((err) => {
        console.log(`error ${err}`)
        res.status(500).json({ data: err })
    })
}

const loginUser = async (req, res) => {
    // fetch the req body and take out the email, password
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    // validate if all the fields are there or not
    if (!(email && password)) {
        return res.status(400).json({ message: "All fields are required" })
    }

    // make sure the email exists.
    const existedUser = await User.findOne({ email });
    console.log(existedUser);
    if(!existedUser) {
        return res.status(400).json({ message: "Email does not exist" })
    }
    if(existedUser === null) {
        return res.status(400).json({ message: "Email does not exist" })
    }

  
    const storedPassword = existedUser.password
    const isValidPassword = await bcrypt.compare(password, storedPassword);

    // const isValidPassword = await existedUser.isPasswordCorrect(password);

    if (!isValidPassword) {
        res.status(400).json({ message: "Invalid Password" })
    }

    // generate tokens and store in the cookies
    const { accessToken, refreshToken } = await getAccessAndRefreshToken(existedUser._id);

    existedUser.password = undefined; // to remove the password from the response
    // cookies can only be changed or updated by server 
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ data: existedUser, message: "USER LOGGED IN SUCCESSFULLY" })
}


const logoutUser = async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({message: "Logout successfully" })

}

const getCurrentUser = async (req,res) => {
    return res.status(200).json({message: "User fetched successfully", data: req.user})
}

export { registerUser, loginUser, logoutUser, getCurrentUser }