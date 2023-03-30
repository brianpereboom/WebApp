const userService = require("./userService");

const getUserById = function(userId, done) {
    userService.getUserById(userId, done);
};

const updateUserDetails = function(userId, userData, done) {
    userService.updateUserDetails(userId, userData, done);
};

module.exports = { getUserById, updateUserDetails };