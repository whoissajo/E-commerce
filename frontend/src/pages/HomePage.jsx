import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();
	const navigate = useNavigate();
	const [activeCategory, setActiveCategory] = useState("ALL");

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	const categories = ["ALL", "WOMEN", "MEN", "KIDS", "ACCESSORIES"];

	// Filter products by category
	const filteredProducts = activeCategory === "ALL" 
		? products?.slice(0, 8) || [] 
		: products?.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase())?.slice(0, 8) || [];

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
			{/* Hero Section - Redesigned for visual impact */}
			<section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:to-gray-900">
				<div className="absolute inset-0 z-0">
					<div className="absolute top-20 left-10 w-72 h-72 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
					<div className="absolute top-40 right-20 w-80 h-80 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="space-y-8"
						>
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="inline-block px-6 py-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-full"
							>
								<span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider">
									NEW COLLECTION 2024
								</span>
							</motion.div>

							<motion.h1
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.4 }}
								className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 leading-tight"
							>
								<span className="block">Elevate Your</span>
								<span className="block text-indigo-600 dark:text-indigo-300 mt-2">Style Today</span>
							</motion.h1>

							<motion.p
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.6 }}
								className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
							>
								Discover premium fashion that blends comfort with cutting-edge design. 
								Experience the perfect fusion of style and sustainability.
							</motion.p>

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.8 }}
								className="flex flex-col sm:flex-row gap-6"
							>
								<motion.button
									onClick={() => navigate('/products')}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl"
								>
									Shop Collection
									<ArrowRight className="w-6 h-6" />
								</motion.button>
							</motion.div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 1, delay: 0.2 }}
							className="relative"
						>
							<div className="relative w-full h-[600px]">
								<motion.div
									className="absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.8, delay: 1 }}
								>
									<img
										src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&h=800&fit=crop"
										alt="Premium fashion collection"
										className="w-full h-full object-cover"
									/>
								</motion.div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* New Arrivals Section */}
			<section className="py-20 bg-white dark:bg-gray-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8">
							New Arrivals
						</h2>

						<div className="flex flex-wrap justify-center gap-8 mb-12">
							{categories.map((category) => (
								<button 
									key={category}
									onClick={() => setActiveCategory(category)}
									className={`text-lg font-medium transition-colors ${
										activeCategory === category
											? "text-indigo-600 dark:text-indigo-300 border-b-2 border-indigo-600 dark:border-indigo-300"
											: "text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
									}`}
								>
									{category}
								</button>
							))}
						</div>
					</motion.div>

					{!isLoading && filteredProducts.length > 0 && (
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							{filteredProducts.map((product, index) => (
								<motion.div
									key={product._id}
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.1 }}
									viewport={{ once: true }}
								>
									<ProductCard product={product} />
								</motion.div>
							))}
						</div>
					)}
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<p className="text-gray-400 dark:text-gray-500">
							&copy; {new Date().getFullYear()} FashionStore. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default HomePage;
