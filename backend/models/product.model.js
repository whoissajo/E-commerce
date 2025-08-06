import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		image: {
			type: String,
			required: [true, "Image is required"],
		},
<<<<<<< HEAD
=======
		images: {
			type: [String],
			default: [],
		},
>>>>>>> 18d9e67 (Initial commit (without .env, with .env.example))
		category: {
			type: String,
			required: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
<<<<<<< HEAD
=======
		stock: {
			type: Number,
			default: 100,
			min: 0,
		},
		colors: {
			type: [String],
			default: ["Black", "White"],
		},
		sizes: {
			type: [String],
			default: [],
		},
		rating: {
			type: Number,
			default: 4.5,
			min: 0,
			max: 5,
		},
		reviewCount: {
			type: Number,
			default: 0,
		},
		brand: {
			type: String,
			default: "Modern Store",
		},
		weight: {
			type: String,
			default: "N/A",
		},
		dimensions: {
			type: String,
			default: "N/A",
		},
>>>>>>> 18d9e67 (Initial commit (without .env, with .env.example))
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
