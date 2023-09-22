const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(401).json({ success: false, message: "Please, Login" });
            return;
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedData.id);
        if (!user) {
            res.status(401).json({ success: false, message: "Please, Login" });
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
            res.status(403).json({ success: false, message: `Role: ${req.user.role} is not allowed to access this resource` })
        } else {
            next();
        }
    }
};