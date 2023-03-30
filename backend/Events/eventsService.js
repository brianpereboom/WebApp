const eventsDAO = require('./eventsDAO');

const getHostedEvents = function(eventId, done) {
    eventsDAO.getHostedEvents(eventId, done);
};

const getRecommendedEvents = function(interest, done) {
    eventsDAO.getRecommendedEvents(interest, done);
};

const updateHostedEvent = function(eventId, eventData, done) {
    eventsDAO.updateHostedEvent(eventId, eventData, done);
};

const removeHostedEvent = function(eventId, done) {
    eventsDAO.removeHostedEvent(eventId, done);
};

const addRsvp = function(eventId, userId, done) {
    eventsDAO.addRsvp(eventId, userId, done);
};

const removeRsvp = function(eventId, userId, done) {
    eventsDAO.removeRsvp(eventId, userId, done);
};

module.exports = { getHostedEvents, getRecommendedEvents, updateHostedEvent, removeHostedEvent, addRsvp, removeRsvp };