const fs = require('fs');

const getHostedEvents = function(userId, done) {
    fs.readFile("Events/events.json", (err, fileContent) => {
        if (err)
            return done("Encountered error while getting events details");
        const fileData = JSON.parse(fileContent);
        const fetchedEvents = [...fileData.filter((event) => event.host == userId)];
        if (fetchedEvents === undefined)
            return done("No events found for requested userId");
        return done(undefined, fetchedEvents);
    });
};

const getEvent = function(eventId, done) {
    fs.readFile("Events/events.json", (err, fileContent) => {
        if (err)
            return done("Encountered error while getting events details");
        const fileData = JSON.parse(fileContent);
        const index = fileData.findIndex((event) => event.details.id == eventId);
        if (index === -1)
            return done("No event found for requested eventId");
        return done(undefined, fileData[index]);
    });
};

const updateHostedEvent = function(eventId, eventData, done) {
    fs.readFile("Events/events.json", (err, fileContent) => {
        if (err)
            return done("Encountered error while getting events details");
        let fileData = JSON.parse(fileContent);
        const index = fileData.findIndex((event) => event.details.id == eventId);
        if (index === -1)
            fileData = [...fileData, eventData];
        else
            fileData[index] = eventData;
        fs.writeFile("Events/events.json", JSON.stringify(fileData), (err, updatedContent) => {
            if (err)
                return done("Encountered error while updating event details");
            return done(undefined, "Successfully updated event details");
        });
    });
};

const removeHostedEvent = function(eventId, done) {
    fs.readFile("Events/events.json", (err, fileContent) => {
        if (err)
            return done("Encountered error while getting events details");
        let fileData = JSON.parse(fileContent);
        const index = fileData.findIndex((event) => event.details.id == eventId);
        if (index === -1)
            return done("No event found for requested eventId");
        fileData.splice(index, 1);
        fs.writeFile("Events/events.json", JSON.stringify(fileData), (err, updatedContent) => {
            if (err)
                return done("Encountered error while updating event details");
            return done(undefined, "Successfully updated event details");
        });
    });
};

const addRsvp = function(eventId, userId, done) {
    fs.readFile("Events/events.json", (err, fileContent) => {
        if (err)
            return done("Encountered error while getting events details");
        let fileData = JSON.parse(fileContent);
        const index = fileData.findIndex((event) => event.details.id == eventId);
        if (index === -1)
            return done("No event found for requested eventId");
        fileData[index].rsvps = [...fileData[index].rsvps.filter((usr) => usr != userId), userId];
        fs.writeFile("Events/events.json", JSON.stringify(fileData), (err, updatedContent) => {
            if (err)
                return done("Encountered error while updating event details");
            return done(undefined, "Successfully updated event details");
        });
    });
};

const removeRsvp = function(eventId, userId, done) {
    fs.readFile("Events/events.json", (err, fileContent) => {
        if (err)
            return done("Encountered error while getting events details");
        let fileData = JSON.parse(fileContent);
        const index = fileData.findIndex((event) => event.details.id == eventId);
        if (index === -1)
            return done("No event found for requested eventId");
        fileData[index].rsvps = [...fileData[index].rsvps.filter((usr) => usr != userId)];
        fs.writeFile("Events/events.json", JSON.stringify(fileData), (err, updatedContent) => {
            if (err)
                return done("Encountered error while updating event details");
            return done(undefined, "Successfully updated event details");
        });
    });
};

module.exports = { getHostedEvents, getEvent, updateHostedEvent, removeHostedEvent, addRsvp, removeRsvp };