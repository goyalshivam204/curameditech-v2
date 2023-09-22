const User = require("../models/userModel");


// This API used to retrieve all the users from the database.
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, message: "Users Retrieved Successfully !", data: users });
    } catch (err) {
        res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }

}

// This API used to retrieve the user with the given ID
exports.getUserByID = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            res.status(200).json({ success: false, message: "User with given id not found!" });
        } else {
            res.status(200).json({ success: true, message: "User Retrieved Successfully", data: user });
        }
    } catch (err) {
        res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }

}

// This API is used to create a new user with given user data
exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = new User(userData);
        console.log(user);
        await user.save();
        res.status(200).json({ success: true, message: "User Created Successfully !!!" });
    } catch (err) {
        res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }

}


// This API used to update details of a given user (identified by id).
exports.updateUserByID = async (req, res) => {
    try {
        const id = req.params.id;
        const {firstname,lastname,age} = req.body;
        const userData = {first_name,last_name,age};
        const user = await User.findByIdAndUpdate(id, userData);
        if (!user) {
            res.status(200).json({ success: false, message: "User with given id not found!" });
        } else {
            res.status(200).json({ success: true, message: "User Updated Successfully" });
        }
    } catch (err) {
        res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }



}

// This API used to delete the given user (identified by id)
exports.deleteUserByID = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(200).json({ success: false, message: "User with given id not found!" });
        } else {
            res.status(200).json({ success: true, message: "User Deleted Successfully" });
        }
    } catch (err) {
        res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }
}

// for showing the authentication functionalities

exports.loginUser = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        // checking if user has given password and email both
        if (!email || !password) {
            res.status(400).json({ success: false, message: 'please Enter email or password' });
            return;
        }
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            res.status(400).json({ success: false, message: "Invalid email or password" });
            return;
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            res.status(400).json({ success: false, message: "Invalid email or password" });
            return;
        }


        const token = user.getJWTToken();

        // option for cookie
        console.log(process.env.COOKIE_EXPIRE)
        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 1000
            ),
            httpOnly: true
        }

        res.status(200).cookie('token', token, options).json({
            success: true,
            message: "logged in successfully",
        });
    } catch (err) {
        res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }
};


exports.logout = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "Logged Out"
        })
    } catch (err) {
        res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }

};



