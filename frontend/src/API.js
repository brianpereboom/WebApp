const saveUser = (userId, userData) => {
    fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(userData)
    });
};

const addUserInterest = (userId, interest) => {
    fetch(`http://localhost:3000/api/interests/user/${userId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({interest: interest})
    });
};

const removeUserInterest = (userId, interest) => {
    fetch(`http://localhost:3000/api/interests/user/${userId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({interest: interest})
    });
};

const addEventInterest = (eventId, interest) => {
    fetch(`http://localhost:3000/api/interests/event/${eventId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({interest: interest})
    });
};

const removeEventInterest = (eventId, interest) => {
    fetch(`http://localhost:3000/api/interests/event/${eventId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({interest: interest})
    });
};

const saveEvent = (eventId, eventData) => {
    fetch(`http://localhost:3000/api/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": 'application/json; charset=UTF-8' },
        body: JSON.stringify(eventData)
    });
};

const removeEvent = (eventId) => {
    fetch(`http://localhost:3000/api/events/${eventId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json; charset=UTF-8"}
    });
};

const addRsvp = (eventId, userId) => {
    fetch(`http://localhost:3000/api/events/rsvp/${eventId}/${userId}`, { method: "PUT" });
};

const removeRsvp = (eventId, userId) => {
    fetch(`http://localhost:3000/api/events/rsvp/${eventId}/${userId}`, { method: "DELETE" });
};

export { saveUser, addUserInterest, removeUserInterest, addEventInterest, removeEventInterest, saveEvent, removeEvent, addRsvp, removeRsvp };