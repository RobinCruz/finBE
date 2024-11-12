const express = require("express");
const router = express.Router();

const UserController = require("../src/controllers/user_controller");

router.get("/health", (req, res, next) => {
    res.send("OK");
})

router
    .route("/user")
    .post(UserController.registerUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);
    

router
    .route("/user/login")
    .post(UserController.loginUser);

router
    .route("/user/logout")
    .post(UserController.logoutUser);

module.exports = router;