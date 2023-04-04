const { Router } = require('express');
const express = require('express');
const routes = express.Router();
const eventsController = require('./eventController');

routes.get("/user/:userId", (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        eventsController.getHostedEvents(userId, (err, results) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(results);
        });
    } catch (err) {
        return res.status(500).send("Unexpected error: Try after sometime", err);
    }
});

routes.get("/:eventId", (req, res) => {
    try {
        const eventId = req.params.eventId;
        eventsController.getEvent(eventId, (err, results) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(results);
        });
    } catch (err) {
        return res.status(500).send("Unexpected error: Try after sometime", err);
    }
});

routes.put("/:eventId", (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId);
        const eventData = req.body;
        eventsController.updateHostedEvent(eventId, eventData, (err, results) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(results);
        });
    } catch (err) {
        return res.status(500).send("Unexpected error: Try after sometime", err);
    }
});

routes.delete("/:eventId", (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId);
        eventsController.removeHostedEvent(eventId, (err, results) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(results);
        });
    } catch (err) {
        return res.status(500).send("Unexpected error: Try after sometime", err);
    }
});

routes.put("/rsvp/:eventId/:userId", (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId);
        const userId = parseInt(req.params.userId);
        eventsController.addRsvp(eventId, userId, (err, results) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(results);
        });
    } catch (err) {
        return res.status(500).send("Unexpected error: Try after sometime", err);
    }
});

routes.delete("/rsvp/:eventId/:userId", (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId);
        const userId = parseInt(req.params.userId);
        eventsController.removeRsvp(eventId, userId, (err, results) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(results);
        });
    } catch (err) {
        return res.status(500).send("Unexpected error: Try after sometime", err);
    }
});

module.exports = routes;