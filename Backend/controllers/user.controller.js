import User from '../models/user.model.js'
import mongoose from 'mongoose'

export const createUser = async (req,res) => {
    const {username, email, password}  = req.body;

    if(!username || !password || !email) {
        return res.status(400).json({ success: false, message: "Please provide all required fields"})
    }
    const newUser = new User({
        username,
        email,
        password
    });

    const existingUser = await User.findOne({email});
    if(existingUser) {
        return res.status(400).json({ success: false, message: "User already exists"})
    }
    try{
        await newUser.save();
        res.status(201).json({ success: true, data: newUser});
    }

    catch(error) {
        if(error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        console.error("User signup Server error", error)
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users})
    }
    catch (error){
        console.log("Couldn't get users:", error)
        res.status(500).json({ success: false, message: "Server Error"})
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "User not found"})
    }

    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.status(200).json( { success: true, message: "User deleted successfully"})
    }

    catch (error) {
        res.status(500).json({ success: false, message: "Server Error"})
    }
}

// Signin/Login Controller
export const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Please provide email and password" 
            });
        }

        // Make sure to select the password field
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Direct comparison for testing
        if (password !== user.password) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        res.status(200).json({ 
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch(error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        });
    }
};