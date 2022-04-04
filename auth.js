const jwt = require("jsonwebtoken");
const secret = "CourseBookingAPI";



module.exports.createAccessToken = (user) => {
	// contains details of user
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	// sign - 3 arguments: 
	return jwt.sign(data, secret, {})

};


module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization
	console.log(token)

	if(typeof token === "undefined"){
		return res.send({auth: "Failed. No Token"})

	} else {
		 token = token.slice(7, token.length)

		 jwt.verify(token, secret, (err, decodedToken) => {

		 	if(err){
		 		return res.send({
		 			auth: "Failed",
		 			message: err.message
		 		})

		 	} else {
		 		req.user = decodedToken;

		 		next();
		 	}
		 })
	}
};


// decode
module.exports.verifyAdmin = (req, res, next) => {

	if(req.user.isAdmin){

		next();
	} else {
		return res.send({
			auth: "Failed",
			message: "Forbidden Action"
		})
	}
};