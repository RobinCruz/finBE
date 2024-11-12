const UserORM = require("../orm/user_orm");

let UserService = {
    validateUser: async (username, password) => {
        try {
            const user = await UserORM.findUserByUsername(username);
            
            if (user?.password == password) {
                return user;
            } else {
                throw new Error('username and password mismatch');
            }
        } catch (error) {
            throw new Error('Error validating user by username and password: ' + error.message);
        }
    },
    logout: async (username) => {
        try {
            const user = await UserORM.findUserByUsername(username);
            if (user) {
                return user;
            } else {
                throw new Error('username does not exist');
            }
        } catch (error) {
            throw new Error('Error logging out user by username: ' + error.message);
        }
    }
}

module.exports = UserService;