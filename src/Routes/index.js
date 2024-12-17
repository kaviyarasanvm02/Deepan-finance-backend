const express = require("express");
const Landing = require("./LandingRoutes");
const db = require("../confic/db");
const path = require("path");


const router = express.Router();
router.use("/landing",Landing)

router.post("/login", (req,res) => {
   const {email,password} = req.body;
   console.log(email,password);
   const query = `SELECT * FROM admin_users WHERE email = '${email}' AND password = '${password}'`;
   db.query(query,(err,results) =>{
    if(err){
        return res.status(500).json({message:"Database error"});
    }
    if(results.length === 0){
        return res.status(401).json({message:"Invalid credentials"});
    }else{
        const user = results[0];
        const message = "success";
        const user_details = {
            name : user.name,
            email : user.email,
            userId: user.id,
        };
        res.send({message, ...user_details});
    }
   });
});

module.exports = router;