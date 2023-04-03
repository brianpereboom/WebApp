const eventDAO = require('./eventDAO');

const getHostedEvents = function(eventId, done) {
    eventDAO.getHostedEvents(eventId, done);
};

const getRecommendedEvents = function(interest, done) {
    eventDAO.getRecommendedEvents(interest, done);
};

const updateHostedEvent = function(eventId, eventData, done) {
    eventDAO.updateHostedEvent(eventId, eventData, done);
};

const removeHostedEvent = function(eventId, done) {
    eventDAO.removeHostedEvent(eventId, done);
};

const addRsvp = function(eventId, userId, done) {
    eventDAO.addRsvp(eventId, userId, done);
};

const removeRsvp = function(eventId, userId, done) {
    eventDAO.removeRsvp(eventId, userId, done);
};

module.exports = { getHostedEvents, getRecommendedEvents, updateHostedEvent, removeHostedEvent, addRsvp, removeRsvp };