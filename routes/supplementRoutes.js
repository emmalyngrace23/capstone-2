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

// retrieve single product
router.get('/getSingleProduct/:id', supplementControllers.getSingleProduct)

// update product
router.put("/:id", verify, verifyAdmin, supplementControllers.updateProduct);

// archive product 
router.put('/archive/:id', verify, verifyAdmin, supplementControllers.archiveSupplement);

// activate product
router.put('/activate/:id', verify, verifyAdmin, supplementControllers.activateSupplement);

module.exports = router;

// retrieve active products
router.get("/getActiveSupplements", supplementControllers.getActiveSupplements);

// get inactive products
router.get("/getInactiveSupplements", supplementControllers.getInactiveSupplements);

// find supplement by name
router.get("/findSupplementByName", supplementControllers.findSupplementByName);