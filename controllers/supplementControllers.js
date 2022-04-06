const bcrypt = require("bcrypt");
const Supplement = require("../models/Supplement"); 
const auth = require("../auth");

// controllers

// create new product document - admin only
module.exports.addSupplement = (req, res) => {
	console.log(req.user.id);
	console.log(req.body);

	Supplement.findOne({name: req.body.name})
	.then(foundSupplement => {
		if (foundSupplement !== null) {
			return res.send("Product already exists");
		} else {
		let newSupplement = new Supplement ({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	})

	newSupplement.save()
	.then(supplement => res.send(supplement))
	.catch(err => res.send(err));
		}
	})
};

//retrieve all products
module.exports.getAllSupplements = (req, res) => {
	Supplement.find({})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

// get single product
module.exports.getSingleProduct = (req, res) => {
	console.log(req.params)

	Supplement.findById(req.params.id)
	.then(result => res.send(result))
	.catch(err => res.send(err));
};


// update product - admin only
module.exports.updateProduct = (req, res) => {
	console.log(req.params.id);

	let updates = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	}

	Supplement.findByIdAndUpdate(req.params.id, updates, {new: true})
	.then(updatedPrice => res.send(updatedPrice))
	.catch(err => res.send(err));
};


// archive product - admin only
module.exports.archiveSupplement = (req, res) => {
	console.log(req.params.id);

	let updates = {
		isActive: false
	}

	Supplement.findByIdAndUpdate(req.params.id, updates, {new: true})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};


// activate product - admin only
module.exports.activateSupplement = (req, res) => {
	console.log(req.params.id);

	let updates = {
		isActive: true
	}

	Supplement.findByIdAndUpdate(req.params.id, updates, {new: true})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

// retrieve active products
module.exports.getActiveSupplements = (req, res) => {
	console.log(req.params)

	Supplement.find({isActive: true})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};


// retrieve inactive products
module.exports.getInactiveSupplements = (req, res) => {
	console.log(req.params)

	Supplement.find({isActive: false})
	.then(result => res.send(result))
	.catch(err => res.send(err))
};

// find product by name 
module.exports.findSupplementByName = (req, res) => {
	console.log(req.params)

	Supplement.find({name: {$regex: req.body.name, $options: '$i'}})
	.then(result => {
		if (result.length === 0) {
			return res.send("No supplements found");
		} else {
			return res.send(result);
		}
	})
	.catch(err => res.send(err));
};

// retrieve all orders by product- Admin only
module.exports.getAllOrders = (req, res) => {
	console.log(req.user)
	console.log(req.params)

	Supplement.findById(req.params.id)
	.then(result => {
		
		let total = 0;
		result.buyers.forEach(buyer => {
			total += buyer.price;
		});
		
		res.send({
			buyers: result.buyers,
			total: total
		});
	})
	.catch(err => res.send(err));
}
