import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}); // find all products
		res.json({ products });
	} catch (error) {
		console.log("Error in getAllProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		let featuredProducts = await redis.get("featured_products");
		if (featuredProducts) {
			return res.json(JSON.parse(featuredProducts));
		}

		// if not in redis, fetch from mongodb
		// .lean() is gonna return a plain javascript object instead of a mongodb document
		// which is good for performance
		featuredProducts = await Product.find({ isFeatured: true }).lean();

		if (!featuredProducts) {
			return res.status(404).json({ message: "No featured products found" });
		}

		// store in redis for future quick access

		await redis.set("featured_products", JSON.stringify(featuredProducts));

		res.json(featuredProducts);
	} catch (error) {
		console.log("Error in getFeaturedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createProduct = async (req, res) => {
	try {
<<<<<<< HEAD
		const { name, description, price, image, category } = req.body;

		let cloudinaryResponse = null;

=======
		const { name, description, price, image, images, category } = req.body;

		let cloudinaryResponse = null;
		let additionalImages = [];

		// Upload main image
>>>>>>> 18d9e67 (Initial commit (without .env, with .env.example))
		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
		}

<<<<<<< HEAD
=======
		// Upload additional images
		if (images && Array.isArray(images) && images.length > 0) {
			const uploadPromises = images.map(img => 
				cloudinary.uploader.upload(img, { folder: "products" })
			);
			const uploadResults = await Promise.all(uploadPromises);
			additionalImages = uploadResults.map(result => result.secure_url);
		}

>>>>>>> 18d9e67 (Initial commit (without .env, with .env.example))
		const product = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
<<<<<<< HEAD
=======
			images: additionalImages,
>>>>>>> 18d9e67 (Initial commit (without .env, with .env.example))
			category,
		});

		res.status(201).json(product);
	} catch (error) {
		console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

<<<<<<< HEAD
=======
export const updateProduct = async (req, res) => {
	try {
		const { name, description, price, image, images, category } = req.body;
		const productId = req.params.id;

		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Handle image updates
		let updatedImageData = {};
		
		// If a new main image is provided, upload it and delete the old one
		if (image && image !== product.image) {
			// Delete old image from Cloudinary
			if (product.image) {
				const publicId = product.image.split("/").pop().split(".")[0];
				try {
					await cloudinary.uploader.destroy(`products/${publicId}`);
				} catch (error) {
					console.log("Error deleting old main image from Cloudinary:", error);
				}
			}
			
			// Upload new main image
			const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
			updatedImageData.image = cloudinaryResponse.secure_url;
		}

		// If new additional images are provided, upload them and delete old ones
		if (images && Array.isArray(images)) {
			// Delete old additional images from Cloudinary
			if (product.images && Array.isArray(product.images)) {
				for (const imageUrl of product.images) {
					const publicId = imageUrl.split("/").pop().split(".")[0];
					try {
						await cloudinary.uploader.destroy(`products/${publicId}`);
					} catch (error) {
						console.log("Error deleting old additional image from Cloudinary:", error);
					}
				}
			}
			
			// Upload new additional images
			if (images.length > 0) {
				const uploadPromises = images.map(img => 
					cloudinary.uploader.upload(img, { folder: "products" })
				);
				const uploadResults = await Promise.all(uploadPromises);
				updatedImageData.images = uploadResults.map(result => result.secure_url);
			} else {
				updatedImageData.images = [];
			}
		}

		// Update product with new data
		const updatedProduct = await Product.findByIdAndUpdate(
			productId,
			{ 
				name, 
				description, 
				price, 
				category,
				...updatedImageData
			},
			{ new: true }
		);

		res.json(updatedProduct);
	} catch (error) {
		console.log("Error in updateProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

>>>>>>> 18d9e67 (Initial commit (without .env, with .env.example))
export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

<<<<<<< HEAD
=======
		// Delete main image from Cloudinary
>>>>>>> 18d9e67 (Initial commit (without .env, with .env.example))
		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
<<<<<<< HEAD
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
=======
				console.log("deleted main image from cloudinary");
			} catch (error) {
				console.log("error deleting main image from cloudinary", error);
			}
		}

		// Delete additional images from Cloudinary
		if (product.images && Array.isArray(product.images)) {
			for (const imageUrl of product.images) {
				const publicId = imageUrl.split("/").pop().split(".")[0];
				try {
					await cloudinary.uploader.destroy(`products/${publicId}`);
					console.log(`deleted additional image from cloudinary: ${publicId}`);
				} catch (error) {
					console.log("error deleting additional image from cloudinary", error);
				}
>>>>>>> 18d9e67 (Initial commit (without .env, with .env.example))
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					image: 1,
					price: 1,
				},
			},
		]);

		res.json(products);
	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const products = await Product.find({ category });
		res.json({ products });
	} catch (error) {
		console.log("Error in getProductsByCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save();
			await updateFeaturedProductsCache();
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function updateFeaturedProductsCache() {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_products", JSON.stringify(featuredProducts));
	} catch (error) {
		console.log("error in update cache function");
	}
}
