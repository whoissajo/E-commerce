import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
	ShoppingCart, 
	Heart, 
	Star, 
	Plus, 
	Minus, 
	Share2, 
	ArrowLeft,
	Truck,
	Shield,
	RotateCcw
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import LoadingSpinner from "../components/LoadingSpinner";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import toast from "react-hot-toast";
import axios from "../lib/axios";

const ProductDetailPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { classes, colors } = useTheme();
	const { addToCart } = useCartStore();
	const { user } = useUserStore();
	
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [selectedColor, setSelectedColor] = useState("");
	const [selectedSize, setSelectedSize] = useState("");
	const [isWishlisted, setIsWishlisted] = useState(false);
	const [activeTab, setActiveTab] = useState("description");

	// Product images - always include main image as first image, then additional images
	const productImages = [product?.image, ...(product?.images || [])].filter(Boolean);

	const colors_options = product?.colors?.map(color => ({
		name: color,
		value: color === "Black" ? "#000000" :
			   color === "White" ? "#FFFFFF" :
			   color === "Red" ? "#EF4444" :
			   color === "Blue" ? "#3B82F6" :
			   color === "Gray" ? "#6B7280" :
			   color === "Navy" ? "#1E3A8A" : "#6B7280"
	})) || [
		{ name: "Black", value: "#000000" },
		{ name: "White", value: "#FFFFFF" }
	];

	const sizes = product?.sizes?.length > 0 ? product.sizes : ["One Size"];

	const features = [
		"Premium quality materials",
		"Durable construction",
		"Easy to clean",
		"Lightweight design",
		"Eco-friendly packaging"
	];

	const specifications = [
		{ label: "Brand", value: product?.brand || "Modern Store" },
		{ label: "Category", value: product?.category || "General" },
		{ label: "Weight", value: product?.weight || "N/A" },
		{ label: "Dimensions", value: product?.dimensions || "N/A" },
		{ label: "Stock", value: `${product?.stock || 0} units` },
		{ label: "Warranty", value: "2 years" }
	];

	useEffect(() => {
		fetchProduct();
	}, [id]);

	const fetchProduct = async () => {
		try {
			setLoading(true);
			// Since we don't have a single product endpoint, we'll fetch all and find the one
			const response = await axios.get("/products/all");
			const foundProduct = response.data.products.find(p => p._id === id);
			
			if (foundProduct) {
				setProduct(foundProduct);
				setSelectedColor(colors_options[0].name);
				setSelectedSize(sizes[0]);
			} else {
				toast.error("Product not found");
				navigate("/products");
			}
		} catch (error) {
			console.error("Error fetching product:", error);
			toast.error("Failed to load product");
			navigate("/products");
		} finally {
			setLoading(false);
		}
	};

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart");
			return;
		}

		const productToAdd = {
			...product,
			quantity,
			selectedColor,
			selectedSize
		};

		for (let i = 0; i < quantity; i++) {
			addToCart(product);
		}
		
		toast.success(`Added ${quantity} item(s) to cart`);
	};

	const handleQuantityChange = (change) => {
		const newQuantity = quantity + change;
		if (newQuantity >= 1 && newQuantity <= 10) {
			setQuantity(newQuantity);
		}
	};

	const handleWishlist = () => {
		if (!user) {
			toast.error("Please login to add to wishlist");
			return;
		}
		setIsWishlisted(!isWishlisted);
		toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
	};

	const handleShare = () => {
		if (navigator.share) {
			navigator.share({
				title: product.name,
				text: product.description,
				url: window.location.href,
			});
		} else {
			navigator.clipboard.writeText(window.location.href);
			toast.success("Product link copied to clipboard");
		}
	};

	if (loading) {
		return <LoadingSpinner />;
	}

	if (!product) {
		return (
			<div className={`${classes.page} flex items-center justify-center`}>
				<div className="text-center">
					<h2 className={`text-2xl font-bold text-${colors.text} mb-4`}>Product not found</h2>
					<button 
						onClick={() => navigate("/products")}
						className={`${classes.button} px-6 py-2 rounded-lg text-white`}
					>
						Back to Products
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className={classes.page}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Back Button */}
				<motion.button
					onClick={() => navigate(-1)}
					className={`flex items-center gap-2 text-${colors.textSecondary} hover:text-${colors.primary} mb-6 transition-colors`}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					<ArrowLeft className="w-5 h-5" />
					Back
				</motion.button>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Product Images */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.7 }}
					>
						{/* Main Image */}
						<div className={`${classes.card} rounded-lg overflow-hidden mb-4 border`}>
							<img
								src={productImages[selectedImage]}
								alt={product.name}
								className="w-full h-96 object-cover"
							/>
						</div>

						{/* Thumbnail Images */}
						<div className="grid grid-cols-4 gap-2">
							{productImages.map((image, index) => (
								<button
									key={index}
									onClick={() => setSelectedImage(index)}
									className={`${classes.card} border-2 rounded-lg overflow-hidden transition-all ${
										selectedImage === index 
											? `border-${colors.primary}` 
											: `border-${colors.border} hover:border-${colors.borderHover}`
									}`}
								>
									<img
										src={image}
										alt={`${product.name} ${index + 1}`}
										className="w-full h-20 object-cover"
									/>
								</button>
							))}
						</div>
					</motion.div>

					{/* Product Info */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.7 }}
						className="space-y-6"
					>
						{/* Title and Rating */}
						<div>
							<h1 className={`text-3xl font-bold text-${colors.text} mb-2`}>
								{product.name}
							</h1>
							<div className="flex items-center gap-2 mb-4">
								<div className="flex items-center">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`w-5 h-5 ${i < Math.floor(product?.rating || 4) ? 'text-yellow-400 fill-current' : `text-${colors.textMuted}`}`}
										/>
									))}
								</div>
								<span className={`text-${colors.textSecondary}`}>
									{product?.rating?.toFixed(1) || "4.0"} ({product?.reviewCount || 0} reviews)
								</span>
							</div>
						</div>

						{/* Price */}
						<div className="flex items-center gap-4">
							<span className={`text-4xl font-bold text-${colors.primary}`}>
								${product.price}
							</span>
							<span className={`text-xl text-${colors.textMuted} line-through`}>
								${(product.price * 1.2).toFixed(2)}
							</span>
							<span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
								Save 20%
							</span>
						</div>

						{/* Description */}
						<p className={`text-${colors.textSecondary} leading-relaxed`}>
							{product.description}
						</p>

						{/* Color Selection */}
						<div>
							<h3 className={`text-lg font-semibold text-${colors.text} mb-3`}>Color:</h3>
							<div className="flex gap-3">
								{colors_options.map((color) => (
									<button
										key={color.name}
										onClick={() => setSelectedColor(color.name)}
										className={`w-10 h-10 rounded-full border-2 transition-all ${
											selectedColor === color.name 
												? `border-${colors.primary} scale-110` 
												: `border-${colors.border}`
										}`}
										style={{ backgroundColor: color.value }}
										title={color.name}
									/>
								))}
							</div>
							<span className={`text-sm text-${colors.textSecondary} mt-2 block`}>
								Selected: {selectedColor}
							</span>
						</div>

						{/* Size Selection */}
						{product.category === "clothing" && (
							<div>
								<h3 className={`text-lg font-semibold text-${colors.text} mb-3`}>Size:</h3>
								<div className="flex gap-2">
									{sizes.map((size) => (
										<button
											key={size}
											onClick={() => setSelectedSize(size)}
											className={`px-4 py-2 border rounded-lg transition-all ${
												selectedSize === size
													? `border-${colors.primary} bg-${colors.primary} text-white`
													: `border-${colors.border} text-${colors.text} hover:border-${colors.borderHover}`
											}`}
										>
											{size}
										</button>
									))}
								</div>
							</div>
						)}

						{/* Quantity */}
						<div>
							<h3 className={`text-lg font-semibold text-${colors.text} mb-3`}>Quantity:</h3>
							<div className="flex items-center gap-4">
								<div className="flex items-center border rounded-lg">
									<button
										onClick={() => handleQuantityChange(-1)}
										className={`p-2 hover:bg-${colors.surfaceHover} transition-colors`}
										disabled={quantity <= 1}
									>
										<Minus className="w-4 h-4" />
									</button>
									<span className={`px-4 py-2 text-${colors.text} font-semibold`}>
										{quantity}
									</span>
									<button
										onClick={() => handleQuantityChange(1)}
										className={`p-2 hover:bg-${colors.surfaceHover} transition-colors`}
										disabled={quantity >= 10}
									>
										<Plus className="w-4 h-4" />
									</button>
								</div>
								<span className={`text-2xl font-bold text-${colors.primary}`}>
									${(product.price * quantity).toFixed(2)}
								</span>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-4">
							<button
								onClick={handleAddToCart}
								className={`flex-1 ${classes.button} text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2`}
							>
								<ShoppingCart className="w-5 h-5" />
								Add to Cart
							</button>
						<button
							onClick={handleWishlist}
							className={`p-3 border rounded-lg transition-all ${
								isWishlisted 
									? "border-red-500 bg-red-500 text-white" 
									: `border-${colors.border} text-${colors.text} hover:border-red-500 hover:text-red-500`
							}`}
						>
							<Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
						</button>
						<button
							onClick={handleShare}
							className={`p-3 border border-${colors.border} text-${colors.text} hover:border-${colors.borderHover} rounded-lg transition-all`}
						>
							<Share2 className="w-5 h-5" />
						</button>
						</div>

						{/* Features */}
						<div className={`${classes.card} p-4 rounded-lg border`}>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="flex items-center gap-3">
									<Truck className={`w-6 h-6 text-${colors.primary}`} />
									<div>
										<p className={`font-semibold text-${colors.text}`}>Free Shipping</p>
										<p className={`text-sm text-${colors.textSecondary}`}>On orders over $50</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<Shield className={`w-6 h-6 text-${colors.primary}`} />
									<div>
										<p className={`font-semibold text-${colors.text}`}>2 Year Warranty</p>
										<p className={`text-sm text-${colors.textSecondary}`}>Full coverage</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<RotateCcw className={`w-6 h-6 text-${colors.primary}`} />
									<div>
										<p className={`font-semibold text-${colors.text}`}>30-Day Returns</p>
										<p className={`text-sm text-${colors.textSecondary}`}>Easy returns</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Product Details Tabs */}
				<motion.div
					className="mt-16"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.3 }}
				>
					{/* Tab Navigation */}
					<div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
						{[
							{ id: "description", label: "Description" },
							{ id: "specifications", label: "Specifications" },
							{ id: "reviews", label: "Reviews (24)" },
							{ id: "shipping", label: "Shipping & Returns" }
						].map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
									activeTab === tab.id
										? `border-${colors.primary} text-${colors.primary}`
										: `border-transparent text-${colors.textSecondary} hover:text-${colors.text}`
								}`}
							>
								{tab.label}
							</button>
						))}
					</div>

					{/* Tab Content */}
					<div className={`${classes.card} p-8 rounded-lg border`}>
						{activeTab === "description" && (
							<div className="space-y-6">
								<h3 className={`text-2xl font-bold text-${colors.text} mb-4`}>Product Description</h3>
								<p className={`text-${colors.textSecondary} leading-relaxed mb-6`}>
									{product.description}
								</p>
								<div>
									<h4 className={`text-lg font-semibold text-${colors.text} mb-3`}>Key Features:</h4>
									<ul className="space-y-2">
										{features.map((feature, index) => (
											<li key={index} className={`flex items-center gap-3 text-${colors.textSecondary}`}>
												<div className={`w-2 h-2 bg-${colors.primary} rounded-full`}></div>
												{feature}
											</li>
										))}
									</ul>
								</div>
							</div>
						)}

						{activeTab === "specifications" && (
							<div className="space-y-6">
								<h3 className={`text-2xl font-bold text-${colors.text} mb-4`}>Specifications</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{specifications.map((spec, index) => (
										<div key={index} className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
											<span className={`font-semibold text-${colors.text}`}>{spec.label}:</span>
											<span className={`text-${colors.textSecondary}`}>{spec.value}</span>
										</div>
									))}
								</div>
							</div>
						)}

						{activeTab === "reviews" && (
							<div className="space-y-6">
								<h3 className={`text-2xl font-bold text-${colors.text} mb-4`}>Customer Reviews</h3>
								<div className="space-y-6">
									{/* Sample Reviews */}
									{[
										{
											name: "John Doe",
											rating: 5,
											date: "2 days ago",
											comment: "Excellent product! Exactly as described and great quality."
										},
										{
											name: "Jane Smith",
											rating: 4,
											date: "1 week ago",
											comment: "Very good product, fast shipping. Highly recommended!"
										},
										{
											name: "Mike Johnson",
											rating: 5,
											date: "2 weeks ago",
											comment: "Outstanding quality and great customer service."
										}
									].map((review, index) => (
										<div key={index} className={`p-4 border border-${colors.border} rounded-lg`}>
											<div className="flex items-center justify-between mb-2">
												<div className="flex items-center gap-3">
													<div className={`w-10 h-10 bg-${colors.primary} rounded-full flex items-center justify-center text-white font-semibold`}>
														{review.name.charAt(0)}
													</div>
													<div>
														<p className={`font-semibold text-${colors.text}`}>{review.name}</p>
														<div className="flex items-center gap-1">
															{[...Array(5)].map((_, i) => (
																<Star
																	key={i}
																	className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : `text-${colors.textMuted}`}`}
																/>
															))}
														</div>
													</div>
												</div>
												<span className={`text-sm text-${colors.textSecondary}`}>{review.date}</span>
											</div>
											<p className={`text-${colors.textSecondary}`}>{review.comment}</p>
										</div>
									))}
								</div>
							</div>
						)}

						{activeTab === "shipping" && (
							<div className="space-y-6">
								<h3 className={`text-2xl font-bold text-${colors.text} mb-4`}>Shipping & Returns</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div>
										<h4 className={`text-lg font-semibold text-${colors.text} mb-3`}>Shipping Information</h4>
										<ul className={`space-y-2 text-${colors.textSecondary}`}>
											<li>• Free shipping on orders over $50</li>
											<li>• Standard delivery: 3-5 business days</li>
											<li>• Express delivery: 1-2 business days</li>
											<li>• International shipping available</li>
										</ul>
									</div>
									<div>
										<h4 className={`text-lg font-semibold text-${colors.text} mb-3`}>Return Policy</h4>
										<ul className={`space-y-2 text-${colors.textSecondary}`}>
											<li>• 30-day return window</li>
											<li>• Items must be in original condition</li>
											<li>• Free return shipping</li>
											<li>• Refund processed within 5-7 days</li>
										</ul>
									</div>
								</div>
							</div>
						)}
					</div>
				</motion.div>

				{/* Related Products */}
				<motion.div
					className="mt-16"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.5 }}
				>
					<PeopleAlsoBought />
				</motion.div>
			</div>
		</div>
	);
};

export default ProductDetailPage;
