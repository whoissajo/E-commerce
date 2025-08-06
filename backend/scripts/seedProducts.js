import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.model.js";

dotenv.config();

const sampleProducts = [
	{
		name: "Wireless Bluetooth Headphones",
		description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
		price: 99.99,
		image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
		images: [
			"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
			"https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
			"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
			"https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&h=500&fit=crop"
		],
		category: "electronics",
		isFeatured: true,
		stock: 50,
		colors: ["Black", "White", "Blue"],
		rating: 4.8,
		reviewCount: 124,
		brand: "AudioTech",
		weight: "250g",
		dimensions: "18 x 15 x 8 cm"
	},
	{
		name: "Smartphone Case",
		description: "Durable protective case for smartphones with shock absorption and wireless charging compatibility.",
		price: 24.99,
		image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop",
		category: "electronics",
		isFeatured: false
	},
	{
		name: "Cotton T-Shirt",
		description: "Comfortable 100% organic cotton t-shirt available in multiple colors. Soft, breathable, and eco-friendly.",
		price: 19.99,
		image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
		images: [
			"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
			"https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop",
			"https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop",
			"https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=500&fit=crop"
		],
		category: "clothing",
		isFeatured: true,
		stock: 200,
		colors: ["White", "Black", "Gray", "Navy"],
		sizes: ["XS", "S", "M", "L", "XL"],
		rating: 4.6,
		reviewCount: 89,
		brand: "EcoWear",
		weight: "150g",
		dimensions: "Standard fit"
	},
	{
		name: "Denim Jeans",
		description: "Classic straight-fit denim jeans made from premium quality denim. Comfortable and stylish for everyday wear.",
		price: 79.99,
		image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
		category: "clothing",
		isFeatured: false
	},
	{
		name: "Running Sneakers",
		description: "Lightweight running shoes with advanced cushioning technology. Perfect for jogging, gym, and casual wear.",
		price: 129.99,
		image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
		category: "shoes",
		isFeatured: true
	},
	{
		name: "Leather Boots",
		description: "Handcrafted genuine leather boots with durable construction. Stylish and comfortable for all seasons.",
		price: 199.99,
		image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop",
		category: "shoes",
		isFeatured: false
	},
	{
		name: "Coffee Mug Set",
		description: "Set of 4 ceramic coffee mugs with elegant design. Microwave and dishwasher safe. Perfect for home or office.",
		price: 34.99,
		image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=500&fit=crop",
		category: "home",
		isFeatured: false
	},
	{
		name: "Desk Lamp",
		description: "Modern LED desk lamp with adjustable brightness and color temperature. USB charging port included.",
		price: 59.99,
		image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
		category: "home",
		isFeatured: true
	},
	{
		name: "Yoga Mat",
		description: "Premium non-slip yoga mat made from eco-friendly materials. Perfect for yoga, pilates, and fitness exercises.",
		price: 39.99,
		image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
		category: "fitness",
		isFeatured: false
	},
	{
		name: "Protein Powder",
		description: "High-quality whey protein powder with 25g protein per serving. Available in chocolate and vanilla flavors.",
		price: 49.99,
		image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&h=500&fit=crop",
		category: "fitness",
		isFeatured: false
	},
	{
		name: "Backpack",
		description: "Durable travel backpack with multiple compartments and laptop sleeve. Water-resistant and comfortable to carry.",
		price: 89.99,
		image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
		category: "accessories",
		isFeatured: true
	},
	{
		name: "Sunglasses",
		description: "Stylish polarized sunglasses with UV protection. Lightweight frame with premium lenses.",
		price: 69.99,
		image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
		category: "accessories",
		isFeatured: false
	}
];

const seedProducts = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		// Clear existing products
		await Product.deleteMany({});
		console.log("Cleared existing products");

		// Insert sample products
		const createdProducts = await Product.insertMany(sampleProducts);
		console.log(`Created ${createdProducts.length} sample products`);

		console.log("Sample products added successfully!");
		process.exit(0);
	} catch (error) {
		console.error("Error seeding products:", error);
		process.exit(1);
	}
};

seedProducts();
