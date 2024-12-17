const express = require("express");
const cors = require("cors");
const path = require("path");
const Environment = require("./src/confic/Environment");
const Routes = require("./src/Routes/index");

const app = express();



// CORS Configuration
app.use(
    cors({
        origin: Environment.ALLOWEDORIGINS,
    })
);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

// Request logging middleware
const log = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

// Routes
app.get("/home", (req, res) => {
    res.status(200).json("Welcome, your app is working well");
});

app.use("/deepanindia", log, Routes);

app.get("/", (req, res) => {
    res.status(200).json("Welcome to the Deepan India backend API");
});

// Error handling middleware (must be at the end)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});

// Start the server
app.listen(Environment.PORT, () => {
    console.log(`Server is running on http://localhost:${Environment.PORT}`);
});

module.exports = app;
