const responder = require("../utils/responder");
const UserORM = require("../orm/user_orm");
const UserService = require("../services/user_service");

let UserController = {
    registerUser: async (req, res, next) => {
        try {
            const body = req?.body;
            if (body?.username && body?.password) {
                await UserORM.createUser(body?.username, body?.password);
                responder.sendResponse(res, 200, "User Registered");
            } else {
                responder.sendResponse(res, 422, "Request should contain username and password");
            }
        } catch (error) {
            return next(error);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const body = req?.body;
            if (body?.username && body?.password) {
                await UserORM.updateUser(body?.username, body?.password);
                responder.sendResponse(res, 200, "User Updated");
            } else {
                responder.sendResponse(res, 422, "Request should contain username and password");
            }
        } catch (error) {
            return next(error);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const body = req?.body;
            if (body?.username) {
                await UserORM.deleteUser(body?.username);
                responder.sendResponse(res, 200, "User Deleted");
            } else {
                responder.sendResponse(res, 422, "Request should contain username");
            }
        } catch (error) {
            return next(error);
        }
    },
    loginUser: async (req, res, next) => {
        try {
            const body = req?.body;
            if (body?.username && body?.password) {
                await UserService.validateUser(body?.username, body?.password);
                responder.sendResponse(res, 200, "User Logged In");
            } else {
                responder.sendResponse(res, 422, "Request should contain username and password");
            }
        } catch (error) {
            responder.sendResponse(res, 403, "Username and Password does not match");
            return next(error)
        }
    },
    logoutUser: async (req, res, next) => {
        try {
            const body = req?.body;
            if (body?.username) {
                await UserService.logout(body?.username);
                responder.sendResponse(res, 200, "User Logged Out");
            } else {
                responder.sendResponse(res, 422, "Request should contain username");
            }
        } catch (error) {
            responder.sendResponse(res, 404, "User Not Found");
            return next(error)
        }
    }
}

module.exports = UserController;