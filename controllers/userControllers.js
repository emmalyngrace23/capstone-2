const bcrypt = require("bcrypt");

const User = require("../models/User");

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