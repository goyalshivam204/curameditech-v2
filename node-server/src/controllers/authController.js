const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = async (req, res, next) => {
    try {
        // const { token } = req.cookies;
        // console.log("cookie",req.cookies);
        // console.log("token",token);
        const token = req.headers.authorization.split(' ')[1];
        console.log("token",token);


        if (token == "null" || !token || token === undefined) {
            res.status(401).json({ success: false, message: "Please, Login", code: 401 });
            return;
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedData.id);
        if (!user) {
            res.status(401).json({ success: false, message: "Please, Login",code: 401 });
            return;
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }

};

exports.isAuthorized = ([...roles]) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403).json({ success: false, message: `Role: ${req.user.role} is not allowed to access this resource` ,code: 403})
        } else {
            next();
        }
    }
};