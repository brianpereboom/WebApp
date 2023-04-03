const eventService = require('./eventService');

const getHostedEvents = function(eventId, done) {
    eventService.getHostedEvents(eventId, done);
};

const getRecommendedEvents = function(interest, done) {
    eventService.getRecommendedEvents(interest, done);
};

const updateHostedEvent = function(eventId, eventData, done) {
    eventService.updateHostedEvent(eventId, eventData, done);
};

const removeHostedEvent = function(eventId, done) {
    eventService.removeHostedEvent(eventId, done);
};

const addRsvp = function(eventId, userId, done) {
    eventService.addRsvp(eventId, userId, done);
};

const removeRsvp = function(eventId, userId, done) {
    eventService.removeRsvp(eventId, userId, done);
};

module.exports = { getHostedEvents, getRecommendedEvents, updateHostedEvent, removeHostedEvent, addRsvp, removeRsvp };