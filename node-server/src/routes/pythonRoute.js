const express = require('express');
const {predictDiabetes,predictDisease,predictHeart} = require("../controllers/pythonController");
const {isAuthenticated} = require("../controllers/authController");
const pythonRouter = express.Router();

pythonRouter.route("/predict").post(predictDisease);
pythonRouter.route("/diabetes").post(predictDiabetes);
pythonRouter.route("/heart").post(predictHeart);


module.exports = pythonRouter;