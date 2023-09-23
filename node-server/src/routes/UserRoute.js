const express = require('express');
const multer = require('multer');
const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./uploads/");
    },
    filename: function(req,file,cb){
        // cb(null, Date.now() + file.originalname)
        cb(null, file.originalname)
    }
})


// const fileFilter=(req,file,cb)=>{
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'||file.mimetype === 'image/png'){
//         cb(null,true);
//     }else{
//         cb(null,false);
//     }
// }

const upload=multer({
    storage: storage,
    // fileFilter: fileFilter
})

const { isAuthenticated, isAuthorized } = require('../controllers/authController');
const { getAllUsers, getUserByID, updatePasswordByAuth,createUser, updateUserByID, deleteUserByID, loginUser, logout, getUserByAuth, getImageByAuth, getImageByID } = require('../controllers/userController');
const usersRouter = express.Router();

// usersRouter.route("/images").get(getImageByAuth);

usersRouter.route("/users").get(isAuthenticated, isAuthorized(["admin"]),getAllUsers);
usersRouter.route("/users/:id").get(isAuthenticated, isAuthorized(["admin"]), getUserByID);
usersRouter.route("/users/:id").put(isAuthenticated, isAuthorized(["admin"]), upload.single('photo'), updateUserByID);
usersRouter.route("/users/:id").delete(isAuthenticated, isAuthorized(["admin"]), deleteUserByID);
// usersRouter.route("/image/:id").get(isAuthenticated, isAuthorized(["admin"]),getImageByID);
usersRouter.route("/image/:id").get(getImageByID);


// Account details
usersRouter.route("/account/details").get(isAuthenticated,getUserByAuth);
usersRouter.route("/account/update").put(isAuthenticated,updatePasswordByAuth);

// for showing authentication requirements
usersRouter.route("/register").post(upload.single('photo'),createUser);
usersRouter.route("/auth/login").post(loginUser);
usersRouter.route('/auth/logout').get(logout);

// Only authenticated user can access this route.
usersRouter.route('/auth/isAuthenticated').get(isAuthenticated, (req, res) => { res.json({ success: true, message: "Yes, Given request is from authenticated user" }) });

// Only authorized user can access this route.
usersRouter.route('/auth/isAuthorized').get(isAuthenticated, isAuthorized(["admin"]), (req, res) => { res.json({ success: true, message: "Yes, Given request is from authorized role" }) });

// test route
usersRouter.route('/auth/test').get(isAuthenticated,(req,res)=>{res.json({sucess: "hurrh"})});

module.exports = usersRouter;