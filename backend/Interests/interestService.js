const interestDAO = require("./interestDAO");

const getInterestedIds = function(interest, done) {
    interestDAO.getInterestedIds(interest, done);
};

const addUserInterest = function(userId, interest, done) {
    interestDAO.addUserInterest(userId, interest, done);
};

const removeUserInterest = function(userId, interest, done) {
    interestDAO.removeUserInterest(userId, interest, done);
};

const addEventInterest = function(eventId, interest, done) {
    interestDAO.addEventInterest(eventId, interest, done);
};

const removeEventInterest = function(eventId, interest, done) {
    interestDAO.removeEventInterest(eventId, interest, done);
};

module.exports = { getInterestedIds, addUserInterest, removeUserInterest, addEventInterest, removeEventInterest };