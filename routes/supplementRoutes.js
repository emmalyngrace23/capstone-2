const express = require('express');
const router = express.Router();
const auth = require("../auth");

const {verify, verifyAdmin} = auth;

// import supplement controllers
const supplementControllers = require("../controllers/supplementControllers");

// create product
router.post("/", verify, verifyAdmin, supplementControllers.addSupplement);

// retrieve all products
router.get("/", supplementControllers.getAllSupplements);

// update price
router.put("/:id", verify, verifyAdmin, supplementControllers.updatePrice);

// archive product 
router.put('/archive/:id', verify, verifyAdmin, supplementControllers.archiveSupplement);



module.exports = router;