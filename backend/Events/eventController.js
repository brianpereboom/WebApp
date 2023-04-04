const eventService = require('./eventService');

const getHostedEvents = function(eventId, done) {
    eventService.getHostedEvents(eventId, done);
};

const getEvent = function(eventId, done) {
    eventService.getEvent(eventId, done);
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

module.exports = { getHostedEvents, getEvent, getRecommendedEvents, updateHostedEvent, removeHostedEvent, addRsvp, removeRsvp };