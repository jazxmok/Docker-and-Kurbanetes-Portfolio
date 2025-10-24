// Express Server for User Management (Running on Port 8080)

const express = require('express');

const app = express();
const port = 8080;
// In-memory array to store user IDs (cleared when the server restarts)
const users = [];

// CRITICAL: Middleware to parse incoming JSON request bodies.
app.use(express.json());

// --- ROUTES ---

// 1. Root Greeting
app.get('/', (req, res) => {
    res.send('Hello from Express server! Access /users for user list or POST to register.');
});

// 2. Get registered users
app.get('/users', (req, res) => {
    return res.json({ 
        totalUsers: users.length, 
        users: users 
    });
});

// 3. Register a new user
app.post('/users', (req, res) => {
    const newUserID = req.body.userId;
    
    // Check 1: Missing User ID
    if (!newUserID) {
        // HTTP 400 Bad Request
        return res.status(400).send('Missing userId');
    }
    
    // Check 2: User ID already exists
    if (users.includes(newUserID)) {
        // HTTP 400 Bad Request
        return res.status(400).send('userId already exists');
    }

    // Success: Register user and send 201 Created
    users.push(newUserID);
    return res.status(201).send(`User '${newUserID}' registered successfully!`);
});

// --- SERVER START ---
// FIX: Only one app.listen call is needed.
app.listen(port, () => {
    // FIX: Using template literals (backticks) for correct port logging
    console.log(`Server Listening on port ${port}`);
});

