import User from '../models/user.model.js'

export const createUser = async (req,res) => {
    const user = req.body;

    if(!user.username || !user.password || !user.email) {
        return res.status(400).json({ success: false, message: "Please provide all required fields"})
    }
    const newUser = new User(user);
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