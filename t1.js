const maxLoggedInUsers = 2; // Maximum allowed logged-in users

let inactivityTimeout; // Variable to store the inactivity timeout

window.onload = function() {
    let loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || {};
    printLoggedInUserIds(loggedInUsers);

    // Example test: Check if a specific session ID is logged in
    let testSessionId = 'example_session_id';
    let isTestSessionLoggedIn = isLoggedIn(testSessionId, loggedInUsers);
    console.log(`Is session ID ${testSessionId} logged in? ${isTestSessionLoggedIn}`);
};

function login() {
    let loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || {};
    let sessionID = generateSessionID();

    if (Object.keys(loggedInUsers).length >= maxLoggedInUsers) {
        alert("Sorry, maximum number of users logged in. Please try again later.");
        return;
    }

    loggedInUsers[sessionID] = true;
    localStorage.setItem('loggedInUsers', JSON.stringify(loggedInUsers));
    alert("You've been logged in!");

    // Log the number of users logged in
    console.log("User logged in. Total users:", Object.keys(loggedInUsers).length);

    // Set a timeout for inactivity logout after 2 minutes (120,000 milliseconds)
    setInactivityTimer();
}

function logout() {
    clearTimeout(inactivityTimeout); // Clear the inactivity timeout
    let loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || {};

    let sessionIDToRemove = Object.keys(loggedInUsers)[0]; // Remove the first session ID (arbitrary)

    if (Object.keys(loggedInUsers).length > 0) {
        delete loggedInUsers[sessionIDToRemove];
        localStorage.setItem('loggedInUsers', JSON.stringify(loggedInUsers));
    }

    // Log the number of users logged in after logout
    console.log("User logged out. Total users:", Object.keys(loggedInUsers).length);
}

function setInactivityTimer() {
    // Clear existing timeout if any
    clearTimeout(inactivityTimeout);

    // Set a timeout for inactivity logout after 2 minutes (120,000 milliseconds)
    inactivityTimeout = setTimeout(logout, 1200); // 2 minutes
}

function generateSessionID() {
    return Math.random().toString(36).substr(2, 9); // Generate a random string as session ID
}

function printLoggedInUserIds(loggedInUsers) {
    console.log("Logged-in user session IDs:");
    Object.keys(loggedInUsers).forEach(sessionId => {
        console.log(sessionId);
    });
}

function isLoggedIn(sessionId, loggedInUsers) {
    return loggedInUsers.hasOwnProperty(sessionId);
}