const express = require('express');
const { isAuthenticated, isAuthorized } = require('../controllers/authController');
const { getAllUsers, getUserByID, createUser, updateUserByID, deleteUserByID, loginUser, logout } = require('../controllers/userController');
const usersRouter = express.Router();

usersRouter.route("/users").get(getAllUsers);
usersRouter.route("/users/:id").get(isAuthenticated,getUserByID);
usersRouter.route("/users/:id").put(updateUserByID);
usersRouter.route("/users/:id").delete(deleteUserByID);

// for showing authentication requirements
usersRouter.route("/register").post(createUser);
usersRouter.route("/auth/login").post(loginUser);
usersRouter.route('/auth/logout').get(logout);

// Only authenticated user can access this route.
usersRouter.route('/auth/isAuthenticated').get(isAuthenticated, (req, res) => { res.json({ success: true, message: "Yes, Given request is from authenticated user" }) });

// Only authorized user can access this route.
usersRouter.route('/auth/isAuthorized').get(isAuthenticated, isAuthorized(["admin"]), (req, res) => { res.json({ success: true, message: "Yes, Given request is from authorized role" }) });

// test route
usersRouter.route('/auth/test').get(isAuthenticated,(req,res)=>{res.json({sucess: "hurrh"})});

module.exports = usersRouter;