const fs = require("fs");

const getInterestedIds = function(interest, done) {
    fs.readFile("Interests/interests.json", (err, fileContent) => {
        if (err)
            return done("Encountered error while getting interests details");
        const interestData = JSON.parse(fileContent);
        const fetchedInterest = interestData.find((int) => int.interest == interest);
        if (fetchedInterest === undefined)
            return done("Interest not found");
        return done(undefined, fetchedInterest.users);
    });
};

const addUserInterest = function(userId, interest, done) {
    fs.readFile("Interests/interests.json", (err, fileContent) => {
        if (err)
            return done("Encountered error while getting interests details");
        let fileData = JSON.parse(fileContent);
        const index = fileData.findIndex((int) => int.interest == interest);
        if (index === -1)
            fileData = [ ...fileData, { interest: interest, users: [userId], events: []}];
        else
            fileData[index].users = [ ...fileData[index].users.filter((id) => id != userId), userId ];
        fs.writeFile("Interests/interests.json", JSON.stringify(fileData), (err, updatedContent) => {
            if (err)
                return done("Encountered error while updating interest details");
            return done(undefined, "Successfully updated interest details");
        });
    });
};

const removeUserInterest = function(userId, interest, done) {
    fs.readFile("Interests/interests.json", (err, fileContent) => {
        if (err)
            return done("Encountered error while getting interests details");
        let fileData = JSON.parse(fileContent);
        const index = fileData.findIndex((int) => int.interest == interest);
        if (index === -1)
            return done("Interest not found");
        if (fileData[index].users.length === 1 && fileData[index].users[0] == userId)
            fileData.splice(index, 1);
        else
            fileData[index].users = [ ...fileData[index].users.filter((id) => id != userId) ];
        fs.writeFile("Interests/interests.json", JSON.stringify(fileData), (err, updatedContent) => {
            if (err)
                return done("Encountered error while updating interest details");
            return done(undefined, "Successfully updated interest details");
        });
    });
};

const addEventInterest = function(eventId, interest, done) {
    fs.readFile("Interests/interests.json", (err, fileContent) => {
        if (err)
            return done("Encountered error while getting interests details");
        let fileData = JSON.parse(fileContent);
        const index = fileData.findIndex((int) => int.interest == interest);
        if (index === -1)
            return done("Interest not found");
        fileData[index].events = [ ...fileData[index].events.filter((id) => id != eventId), eventId ];
        fs.writeFile("Interests/interests.json", JSON.stringify(fileData), (err, updatedContent) => {
            if (err)
                return done("Encountered error while updating interest details");
            return done(undefined, "Successfully updated interest details");
        });
    });
};

const removeEventInterest = function(eventId, interest, done) {
    fs.readFile("Interests/interests.json", (err, fileContent) => {
        if (err)
            return done("Encountered error while getting interests details");
        let fileData = JSON.parse(fileContent);
        const index = fileData.findIndex((int) => int.interest == interest);
        if (index === -1)
            return done("Interest not found");
        fileData[index].events = [ ...fileData[index].events.filter((id) => id != eventId) ];
        fs.writeFile("Interests/interests.json", JSON.stringify(fileData), (err, updatedContent) => {
            if (err)
                return done("Encountered error while updating interest details");
            return done(undefined, "Successfully updated interest details");
        });
    });
};

module.exports = { getInterestedIds, addUserInterest, removeUserInterest, addEventInterest, removeEventInterest };