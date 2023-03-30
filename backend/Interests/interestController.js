const interestService = require("./interestService");

const getInterestedIds = function(interest, done) {
    interestService.getInterestedIds(interest, done);
};

const addUserInterest = function(userId, interest, done) {
    interestService.addUserInterest(userId, interest, done);
};

const removeUserInterest = function(userId, interest, done) {
    interestService.removeUserInterest(userId, interest, done);
};

const addEventInterest = function(eventId, interest, done) {
    interestService.addEventInterest(eventId, interest, done);
};

const removeEventInterest = function(eventId, interest, done) {
    interestService.removeEventInterest(eventId, interest, done);
};

module.exports = { getInterestedIds, addUserInterest, removeUserInterest, addEventInterest, removeEventInterest };