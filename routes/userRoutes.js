const express = require('express');
const router = express.Router();

// import user controllers
const userControllers = require("../controllers/userControllers");

const auth  = require("../auth");

const {verify, verifyAdmin} = auth;


// Routes

// User Registration
router.post("/", userControllers.registerUser);

// Get all Users
router.get("/", userControllers.getAllUsers);

// Login User
router.post("/login", userControllers.loginUser);

// Set Regular User to Admin
router.put("/updateToAdmin/:id", verify, verifyAdmin, userControllers.updateToAdmin);

// Creation of Order by Regular User
router.post("/createOrder", verify, userControllers.createOrder);









module.exports = router; 









