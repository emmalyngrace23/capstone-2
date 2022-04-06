const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email is required"]
	},
	password: {
		type: String,
		required: [true, "Password is required"]
	},
	isAdmin: {
		type: Boolean,
		default: false 
	},
	purchases: [
		{
			supplementId: {
				type: String,
				required: [true, "Supplement Id is required"]
			},
			name: {
				type: String,
				required: [true, "Name is required"]
			},
			price: {
				type: Number,
				required: [true, "Price is required"]
			},
			status: {
				type: String,
				default: "Sold"
			},
			datePurchased: {
				type: Date,
				default: new Date()
			}
		}
	]
})

module.exports = mongoose.model("User", userSchema);
