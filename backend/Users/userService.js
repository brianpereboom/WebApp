const userDAO = require("./userDAO");

const getUserById = function(userId, done) {
    userDAO.getUserById(userId, done);
};

const updateUserDetails = function(userId, userData, done) {
    userDAO.updateUserDetails(userId, userData, done);
};

module.exports = { getUserById, updateUserDetails };