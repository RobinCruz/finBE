const sequelize = require('../../config/db_connection');
const User = require('../models/User');

let UserORM = {
    sync: async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync();
            console.log('Database connected and models synchronized.');
        } catch (error) {
            throw new Error('Error connecting to database: ' + error.message);
        }
    },
    createUser: async (username, password) => {
        try {
            await UserORM.sync();
            const newUser = await User.create({
                username,
                password
            })
            console.log('User inserted:', newUser);
        } catch (error) {
            throw new Error('Error inserting user: ' + error.message);
        }
    },
    updateUser: async (username, password) => {
        try {
            await UserORM.sync();
            const [updatedUser] = await User.update({ password }, {
                where: { username }
            });
            if (updatedUser) {
                return UserORM.findUserByUsername(username);
            }
            throw new Error('User not found');
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    },
    deleteUser: async (username) => {
        try {
            await UserORM.sync();
            const deleted = await User.destroy({
                where: { username }
            });

            if (deleted) {
                return `User with username ${username} deleted successfully.`;
            }
            throw new Error('User not found');
        } catch (error) {
            throw new Error('Error deleteing user: ' + error.message);
        }
    },
    findAllUserNames: async () => {
        try {
            await UserORM.sync();
            const allUsers = await User.findAll();
            return (allUsers.map(user => user.dataValues.username));
        } catch (error) {
            throw new Error('Error finding all usernames: ' + error.message);
        }
    },
    findUserByUsername: async (username) => {
        try {
            await UserORM.sync();
            const user = await User.findOne({
                where: {
                    username
                }
            });
            if (user) {
                return user;
            } else {
                console.log(`No user found for username: ${username}`);
                return null;
            }
        } catch (error) {
            throw new Error('Error finding user by username: ' + error.message);
        }
    }
}

module.exports = UserORM;