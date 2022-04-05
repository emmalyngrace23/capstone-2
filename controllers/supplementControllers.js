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

//get all products
module.exports.getAllSupplements = (req, res) => {
	Supplement.find({})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

// update price - admin only
module.exports.updatePrice = (req, res) => {
	console.log(req.params.id);

	let updates = {
		price: req.body.price
	}

	Supplement.findByIdAndUpdate(req.params.id, updates, {new: true})
	.then(updatedPrice => res.send(updatedPrice))
	.catch(err => res.send(err));
};

// archive supplememnt - admin only
module.exports.archiveSupplement = (req, res) => {
	console.log(req.params.id);

	let updates = {
		isActive: false
	}

	Supplement.findByIdAndUpdate(req.params.id, updates, {new: true})
	.then(updatedPrice => res.send(updatedPrice))
	.catch(err => res.send(err));
};
