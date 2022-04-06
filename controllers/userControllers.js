const bcrypt = require("bcrypt");

const User = require("../models/User");
const Supplement = require("../models/Supplement");

const auth = require("../auth");


// Controllers 

// User Registration

module.exports.registerUser = (req, res) => {
	console.log(req.body);

	User.findOne({email: req.body.email})
		.then(foundUser => {
			if (foundUser !== null) {
				return res.send("The user already exists");
			}


			// validate password
			const isValidPassword = req.body.password.length >= 6;


			if (isValidPassword) {
				const hashedPW = bcrypt.hashSync(req.body.password, 10);

				// create new user document

				let newUser = new User ({
					email: req.body.email,
					password: hashedPW
				})

				newUser.save()
				.then(user => res.send(user))
				.catch(err => res.send(err));
			} else {
				return res.send("Password should be alteast 6 characters");
			}

		});

};

// Get all Users

module.exports.getAllUsers = (req, res) => {

	User.find({})
	.then(result => res.send(result))
	.catch(err => res.send(err))
}

// Login User

module.exports.loginUser = (req, res) => {
	console.log(req.body); 
	
	User.findOne({email: req.body.email})
	.then(foundUser => {

		if(foundUser === null) {
			return res.send("The user does not exist");

		} else {
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, foundUser.password)

			if(isPasswordCorrect){

				return res.send({accessToken: auth.createAccessToken(foundUser)})
			} else {

				return res.send("Password is incorrect")
			}
		}
	})
	.catch(err => res.send(err));
};


// Update to Admin

module.exports.updateToAdmin = (req, res) => {
	console.log(req.user.id);
	console.log(req.params.id);

	let updates = {
		isAdmin: true
	}

	User.findByIdAndUpdate(req.params.id, updates, {new: true})
	.then(updatedUser => res.send(updatedUser))
	.catch(err => res.send(err));
}

// Create Order

module.exports.createOrder = async (req, res) => {
	console.log(req.body.supplementId);
	console.log(req.user.id);

	if(req.user.isAdmin) {
		return res.send("Action Forbidden");
	};



	let supplementOrdered;

	let isSupplementUpdated = await Supplement.findById(req.body.supplementId)
	.then(supplement => {
		console.log("supplement", supplement);
		supplementOrdered = supplement;

		let buyer = {
			userId: req.user.id,
			price: supplementOrdered.price
		}

		supplement.buyers.push(buyer);

		return supplement.save()
		.then(supplement => true)
		.catch(err => err.message )
	});

	if(isSupplementUpdated !== true){
		return res.send({message: isSupplementUpdated})
	};

	let isUserUpdated = await User.findById(req.user.id)
	.then(user => {
		console.log("user", user)
		console.log(req.body)

		let newOrder = {
			supplementId: req.body.supplementId,
			name: supplementOrdered.name,
			price: supplementOrdered.price
		}

		user.purchases.push(newOrder);

		return user.save()
		.then(user => true)
		.catch(err => err.message);
	})

	if(isUserUpdated !== true) {
		return res.send({message: isUserUpdated})
	}

	if (isUserUpdated && isSupplementUpdated) {
		return res.send({message: 'Order Successful!'})
	};

};

// Retrieve User's Orders
module.exports.getOrders = (req, res) => {
	console.log(req.user)


	User.findById(req.user.id)
	.then(result =>{
		
		let total = 0;
		result.purchases.forEach(purchase => {
			total += purchase.price;
		});
		
		res.send({
			purchases: result.purchases,
			total: total
		});
	})
	.catch(err => res.send(err));
};