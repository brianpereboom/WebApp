const apiUrl = `https://hpfoa7r5v7.execute-api.us-east-1.amazonaws.com/staging`;

const saveUser = (userId, userData) => {
    fetch(`${apiUrl}/users/${userId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(userData)
    });
};

const addUserInterest = (userId, interest) => {
    fetch(`${apiUrl}/interests/user/${userId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({interest: interest})
    });
};

const removeUserInterest = (userId, interest) => {
    fetch(`${apiUrl}/interests/user/${userId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({interest: interest})
    });
};

const addEventInterest = (eventId, interest) => {
    fetch(`${apiUrl}/interests/event/${eventId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({interest: interest})
    });
};

const removeEventInterest = (eventId, interest) => {
    fetch(`${apiUrl}/interests/event/${eventId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({interest: interest})
    });
};

const saveEvent = (eventId, eventData) => {
    fetch(`${apiUrl}/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": 'application/json; charset=UTF-8' },
        body: JSON.stringify(eventData)
    });
};

const removeEvent = (eventId) => {
    fetch(`${apiUrl}/events/${eventId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json; charset=UTF-8"}
    });
};

const addRsvp = (eventId, userId) => {
    fetch(`${apiUrl}/events/rsvp/${eventId}/${userId}`, { method: "PUT" });
};

const removeRsvp = (eventId, userId) => {
    fetch(`${apiUrl}/events/rsvp/${eventId}/${userId}`, { method: "DELETE" });
};

export { apiUrl, saveUser, addUserInterest, removeUserInterest, addEventInterest, removeEventInterest, saveEvent, removeEvent, addRsvp, removeRsvp };