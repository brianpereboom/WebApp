const fs = require("fs");

const getUserById = function(userId, done) {
    fs.readFile("Users/users.json", (err, fileContent) => {
        if (err)
            return done("Encountered error while getting users details");
        const userData = JSON.parse(fileContent);
        const fetchedUser = userData.find(usr => usr.profile.id == userId) || 
        {
            profile: {
                id: userId,
                name: "",
                birthdate: "",
                address: ""
            },
            interests: [],
            hosted: [],
            rsvp: []
        };
        return done(undefined, fetchedUser);
    })
}

const updateUserDetails = function(userId, userData, done) {
    fs.readFile("Users/users.json", (err, fileContent) => {
        if (err)
            return done("Encountered error while getting users details");
        let fileData = JSON.parse(fileContent);
        const index = fileData.findIndex(usr => usr.profile.id == userId);
        if (index === -1)
            fileData = [...fileData, userData];
        else
            fileData[index] = userData;
        fs.writeFile("Users/users.json", JSON.stringify(fileData), (err, updatedContent) => {
            if (err)
                return done("Encountered error while updating user details");
            return done(undefined, "Successfully updated user details");
        });
    });
};

module.exports = { getUserById, updateUserDetails };