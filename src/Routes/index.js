const express = require("express");
const Landing = require("./LandingRoutes");
const db = require("../confic/db");
const path = require("path");


const router = express.Router();
router.use("/landing",Landing)

router.post("/login", (req, res) => {
    const { email, password } = req.body; // Ensure email and password are used
    if (!email || !password) {
       return res.status(400).json({ message: "Email and password are required" });
    }
 
    const query = `SELECT * FROM admin_users WHERE email = ? AND password = ?`;
    db.query(query, [email, password], (err, results) => {
       if (err) {
          return res.status(500).json({ message: "Database error" });
       }
       if (results.length === 0) {
          return res.status(401).json({ message: "Invalid credentials" });
       } else {
          const user = results[0];
          const user_details = {
             name: user.name,
             email: user.email,
             userId: user.id,
          };
          res.json({ message: "success", ...user_details });
       }
    });
 });
 

module.exports = router;