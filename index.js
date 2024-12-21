const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const Environment = require("./src/confic/Environment");
const Routes = require("./src/Routes/index");

const app = express();

// Ensure Upload Directory Exists
const uploadDir = path.join(__dirname, "./public/Docs/Landing/");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// CORS Configuration
app.use(
    cors()
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve Static Files
// app.use("public", express.static(path.join(__dirname, "./public/Docs/Landing")));
app.use("/Docs/Landing", express.static(path.join(__dirname, "./public/Docs/Landing")));


// Request Logging Middleware
const log = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

// Home Route
app.get("/home", (req, res) => {
    res.status(200).json("Welcome, your app is working well");
});

// Routes
app.use("/deepanindia", log, Routes);

app.get("/", (req, res) => {
    res.status(200).json("Welcome to the Deepan India backend API");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});

// Start Server
app.listen(Environment.PORT || 8080, () => {
    console.log(`Server is running on http://localhost:${Environment.PORT || 8080}`);
});

module.exports = app;
