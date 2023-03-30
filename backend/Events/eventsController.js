const eventsService = require('./eventsService');

const getHostedEvents = function(eventId, done) {
    eventsService.getHostedEvents(eventId, done);
};

const getRecommendedEvents = function(interest, done) {
    eventsService.getRecommendedEvents(interest, done);
};

const updateHostedEvent = function(eventId, eventData, done) {
    eventsService.updateHostedEvent(eventId, eventData, done);
};

const removeHostedEvent = function(eventId, done) {
    eventsService.removeHostedEvent(eventId, done);
};

const addRsvp = function(eventId, userId, done) {
    eventsService.addRsvp(eventId, userId, done);
};

const removeRsvp = function(eventId, userId, done) {
    eventsService.removeRsvp(eventId, userId, done);
};

module.exports = { getHostedEvents, getRecommendedEvents, updateHostedEvent, removeHostedEvent, addRsvp, removeRsvp };