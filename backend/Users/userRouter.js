const { Router } = require("express");
const express = require("express");
const routes = express.Router();
const userController = require("./userController");

routes.put("/", (req, res) => {
    try {
        const userData = req.body;
        userController.updateUserDetails(-1, userData, (err, results) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(results);
        });
    } catch (err) {
        return res.status(500).send("Unexpected error: Try after sometime", err);
    }
})

routes.get("/:userId", (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        userController.getUserById(userId, (err, results) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(results);
        });
    } catch (err) {
        return res.status(500).send("Unexpected error: Try after sometime", err);
    }
})

routes.put("/:userId", (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const userData = req.body;
        userController.updateUserDetails(userId, userData, (err, results) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(results);
        });
    } catch (err) {
        return res.status(500).send("Unexpected error: Try after sometime", err);
    }
})

module.exports = routes;