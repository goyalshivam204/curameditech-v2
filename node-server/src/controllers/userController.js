const User = require("../models/userModel");
const path = require('path');


// This API is used to create a new user with given user data
// HANDLED BY MULTER SEE ROUTE FOR MORE DETAILS
exports.createUser = async (req, res) => {
    try {
        const { email, username, firstname, lastname, password} = req.body;
        
        let userData = { email, username, firstname, lastname, password};
        if(req.file){
            const photo = req.file.filename;
            userData = { ...userData,photo};
        }
        // console.log(req.file);
        // console.log("org name",req.file.originalname);
        // console.log("name",req.filename);
        // console.log("photo:",photo);
        const user = new User(userData);
        // console.log(user);
        await user.save();
        const token = user.getJWTToken();

        res.status(200).json({
            success: true,
            message: "User Created Successfully !!!",
            token: token
        });
    } catch (err) {
        res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }

}

// Send Profile Image
exports.getImageByAuth = async(req,res) => {
    res.sendFile( 'defaultProfile.png' , {root: "./uploads"});
    // res.json({success: true});
    
}


// Account START 
exports.getUserByAuth = async(req,res) =>{
    try{
        res.status(200).json({ success: true, message: "Account Details Retrived!!!", data: req.user });
    }catch(err){
        res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }
}


// Authenticated Route, Please Make sure to add is Authenticated...
exports.updatePasswordByAuth = async(req,res) => {

    try{
        const { currentPassword, newPassword, confirmPassword } = req.body;
        console.log(req.body);
        console.log(currentPassword, newPassword, confirmPassword);
        const user = await User.findOne({ email: req.user.email }).select("+password");

        const isPasswordMatched = await user.comparePassword(currentPassword);

        if (!isPasswordMatched) {
            res.status(200).json({ success: false, message: "Invalid old password" });
            return;
        }

        if (newPassword !== confirmPassword) {
            res.status(200).json({ success: false, message: "new Password not same as confirm Password" });
            return;
        }
        // user.update({password: confirmPassword});
        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password Updated!!" })
    }catch(err){
        res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }
    
}
// Account END 

// This API used to retrieve all the users from the database.


// ADMIN PROTECTED ROUTES.
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



// This API used to update details of a given user (identified by id).
exports.updateUserByID = async (req, res) => {
    try {
        const id = req.params.id;
        // const {firstname,lastname,age} = req.body;
        // const userData = {first_name,last_name,age};

        if (id == req.user._id) {
            res.status(405).json({ success: false, message: "You Can't Update you're own Account..." })
            return;
        }
        let userData = req.body; 
        console.log(req.body);
        if (req.file) {
            const photo = req.file.filename;
            userData = { ...userData, photo };
        }
        // console.log(userData);
        const user = await User.findByIdAndUpdate(id, userData,{new: true});
        console.log(user);
        if (!user) {
            res.status(200).json({ success: false, message: "User with given id not found!" });
        } else {
            res.status(200).json({ success: true, message: "User Updated Successfully", data: user });
        }
    } catch (err) {
        res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }



}

// This API used to delete the given user (identified by id)
// Admin Route...
// Send Profile Image   
// For testing removing Admin route, and auth route.
exports.getImageByID = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        res.sendFile(user.photo, { root: "./uploads" });
        // res.sendFile('defaultProfile.png', { root: "./uploads" });
    }catch(err){
        res.json({success: false, message: err.message});
    }
  
}

// This API used to delete the given user (identified by id)
// Admin Route...
exports.deleteUserByID = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id,"\n\n", req.user, "\n\n", req.user._id);
        if ( id == req.user._id) {
            res.status(405).json({ success: false, message: "You Can't delete you're own Account..." })
            return;
        }
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






// LOGIN/SIGN IN  - LOGOUT/SIGN OUT FUNCTIONALITIES...
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

        // // option for cookie
        // console.log(process.env.COOKIE_EXPIRE)
        // const options = {
        //     expires: new Date(
        //         Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 1000
        //     ),
        //     httpOnly: true,
        //     // sameSite: 'None'
        // }

        // res.status(200).cookie('token', token, options).json({
        //     success: true,
        //     message: "logged in successfully",
        //     token: token
        // });
        // console.log(token);
        res.status(200).json({
            success: true,
            message: "logged in successfully",
            token: token
        })
    } catch (err) {
        res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }
};


// no, need of when client exist.
exports.logout = async (req, res, next) => {
    try {
        // res.cookie("token", null, {
        //     expires: new Date(Date.now()),
        //     httpOnly: true
        // })
        // res.status(200).json({
        //     success: true,
        //     message: "Logged Out"
        // })

        res.status(200).json({
            success: true,
            message: "Logged Out",
            token: null
        })
    } catch (err) {
        res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }

};



