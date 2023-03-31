const express = require("express");
const app = express();
const config = require("./config");
const userRouter = require("./Users");
const interestRouter = require("./Interests");
const eventRouter = require("./Events");
const LoggerMiddleware = (req, res, next) => {
    console.log(`Logged ${req.url} ${req.method} ${Date()}`);
    next();
};

const cors = require("cors");
app.use(cors());

app.use(LoggerMiddleware);
app.use(express.json());
app.use("/", userRouter);
app.use("/api/users", userRouter);
app.use("/api/interests", interestRouter);
app.use("/api/events", eventRouter);
app.use((req, res, next) => {
    res.status(400).send("Resource not found");
});
app.listen(config.PORT, () => {
    console.log("Listening on port 3000");
});