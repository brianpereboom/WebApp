const { router } = require("express");
const express = require("express");
const routes = express.Router();
const interestController = require("./interestController");

routes.get("/:interest", (req, res) => {
    try {
        const interest = req.params.interest;
        interestController.getInterestedIds(interest, (err, results) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(results);
        });
    } catch (err) {
        return res.status(500).send("Unexpected error: Try after sometime", err);
    }
});

routes.put("/user/:userId", (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const interest = req.body.interest;
        interestController.addUserInterest(userId, interest, (err, results) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(results);
        });
    } catch (err) {
        return res.status(500).send("Unexpected error: Try after sometime", err);
    }
});

routes.delete("/user/:userId", (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const interest = req.body.interest;
        interestController.removeUserInterest(userId, interest, (err, results) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(results);
        });
    } catch (err) {
        return res.status(500).send("Unexpected error: Try after sometime", err);
    }
});

routes.put("/event/:eventId", (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId);
        const interest = req.body.interest;
        interestController.addEventInterest(eventId, interest, (err, results) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(results);
        });
    } catch (err) {
        return res.status(500).send("Unexpected error: Try after sometime", err);
    }
});

routes.delete("/event/:eventId", (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId);
        const interest = req.body.interest;
        interestController.removeEventInterest(eventId, interest, (err, results) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(results);
        });
    } catch (err) {
        return res.status(500).send("Unexpected error: Try after sometime", err);
    }
});

module.exports = routes;