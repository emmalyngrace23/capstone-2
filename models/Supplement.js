const mongoose = require('mongoose');

let supplementSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Product Name is required."]
	},
	description: {
		type: String,
		required: [true, "Description is required."]
	}, 
	price: {
		type: Number,
		required: [true, "Price is required."]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: new Date()
	},
	buyers: [
		{
			userId: {
				type: String,
				required: [true, "User Id is required"]
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





module.exports = mongoose.model("Supplement", supplementSchema);

