import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List } from "lucide-react";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useProductStore } from "../stores/useProductStore";
import { useTheme } from "../contexts/ThemeContext";
import axios from "../lib/axios";

const ProductsPage = () => {
	const [allProducts, setAllProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [sortBy, setSortBy] = useState("name");
	const [viewMode, setViewMode] = useState("grid");
	const { classes, colors } = useTheme();

	const categories = [
		"all",
		"electronics",
		"clothing",
		"shoes",
		"home",
		"fitness",
		"accessories"
	];

	// Fetch all products
	useEffect(() => {
		const fetchAllProducts = async () => {
			try {
				setLoading(true);
				const response = await axios.get("/products");
				setAllProducts(response.data.products);
				setFilteredProducts(response.data.products);
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchAllProducts();
	}, []);

	// Filter and search products
	useEffect(() => {
		let filtered = [...allProducts];

		// Filter by category
		if (selectedCategory !== "all") {
			filtered = filtered.filter(product => 
				product.category.toLowerCase() === selectedCategory.toLowerCase()
			);
		}

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(product =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.description.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Sort products
		filtered.sort((a, b) => {
			switch (sortBy) {
				case "price-low":
					return a.price - b.price;
				case "price-high":
					return b.price - a.price;
				case "name":
					return a.name.localeCompare(b.name);
				default:
					return 0;
			}
		});

		setFilteredProducts(filtered);
	}, [allProducts, selectedCategory, searchTerm, sortBy]);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className={classes.page}>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header */}
				<motion.div
					className='text-center mb-8'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className={`text-4xl sm:text-5xl font-bold text-${colors.primary} mb-4`}>
						All Products
					</h1>
					<p className={`text-xl text-${colors.textSecondary}`}>
						Discover our complete collection of amazing products
					</p>
				</motion.div>

				{/* Filters and Search */}
				<motion.div
					className={`${classes.card} rounded-lg p-6 mb-8 border`}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
						{/* Search */}
						<div className='relative'>
							<Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-${colors.textMuted} w-5 h-5`} />
							<input
								type='text'
								placeholder='Search products...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className={`w-full pl-10 pr-4 py-2 ${classes.input} border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500`}
							/>
						</div>

						{/* Category Filter */}
						<div>
							<select
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
								className={`w-full px-4 py-2 ${classes.input} border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500`}
							>
								{categories.map(category => (
									<option key={category} value={category}>
										{category.charAt(0).toUpperCase() + category.slice(1)}
									</option>
								))}
							</select>
						</div>

						{/* Sort */}
						<div>
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className={`w-full px-4 py-2 ${classes.input} border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500`}
							>
								<option value='name'>Sort by Name</option>
								<option value='price-low'>Price: Low to High</option>
								<option value='price-high'>Price: High to Low</option>
							</select>
						</div>

						{/* View Mode */}
						<div className='flex gap-2'>
							<button
								onClick={() => setViewMode('grid')}
								className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg transition-colors ${
									viewMode === 'grid'
										? classes.button
										: classes.buttonSecondary
								}`}
							>
								<Grid className='w-5 h-5' />
							</button>
							<button
								onClick={() => setViewMode('list')}
								className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg transition-colors ${
									viewMode === 'list'
										? classes.button
										: classes.buttonSecondary
								}`}
							>
								<List className='w-5 h-5' />
							</button>
						</div>
					</div>
				</motion.div>

				{/* Results Count */}
				<motion.div
					className='mb-6'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					<p className={`text-${colors.textSecondary}`}>
						Showing {filteredProducts.length} of {allProducts.length} products
					</p>
				</motion.div>

				{/* Products Grid */}
				<motion.div
					className={`grid gap-6 ${
						viewMode === 'grid' 
							? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
							: 'grid-cols-1'
					}`}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
				>
					{filteredProducts.length === 0 ? (
						<div className='col-span-full text-center py-12'>
							<h3 className={`text-2xl font-semibold text-${colors.textSecondary} mb-4`}>
								No products found
							</h3>
							<p className={`text-${colors.textMuted}`}>
								Try adjusting your search or filter criteria
							</p>
						</div>
					) : (
						filteredProducts.map((product) => (
							<ProductCard key={product._id} product={product} />
						))
					)}
				</motion.div>
			</div>
		</div>
	);
};

export default ProductsPage;
