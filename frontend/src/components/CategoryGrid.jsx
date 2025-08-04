import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const CategoryGrid = () => {
	const { colors } = useTheme();

	const categories = [
		{ 
			name: "Electronics", 
			href: "/category/electronics", 
			image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
			count: "50+ Products",
			description: "Latest gadgets and tech"
		},
		{ 
			name: "Clothing", 
			href: "/category/clothing", 
			image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
			count: "100+ Products",
			description: "Fashion for every style"
		},
		{ 
			name: "Shoes", 
			href: "/category/shoes", 
			image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
			count: "75+ Products",
			description: "Step up your game"
		},
		{ 
			name: "Home & Living", 
			href: "/category/home", 
			image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
			count: "60+ Products",
			description: "Make your house a home"
		},
		{ 
			name: "Fitness", 
			href: "/category/fitness", 
			image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
			count: "40+ Products",
			description: "Gear up for fitness"
		},
		{ 
			name: "Accessories", 
			href: "/category/accessories", 
			image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
			count: "80+ Products",
			description: "Complete your look"
		}
	];

	return (
		<section className="py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className={`text-4xl lg:text-5xl font-bold text-${colors.text} mb-4`}>
						Shop by Category
					</h2>
					<p className={`text-xl text-${colors.textSecondary} max-w-2xl mx-auto`}>
						Explore our wide range of categories and find exactly what you're looking for
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{categories.map((category, index) => (
						<motion.div
							key={category.name}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: index * 0.1 }}
							viewport={{ once: true }}
						>
							<Link
								to={category.href}
								className="group block relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
							>
								<div className="relative">
									<img
										src={category.image}
										alt={category.name}
										className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300"></div>
								</div>
								
								<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
									<div className="flex items-end justify-between">
										<div>
											<h3 className="text-2xl font-bold mb-1 group-hover:text-emerald-300 transition-colors">
												{category.name}
											</h3>
											<p className="text-sm opacity-90 mb-1">{category.description}</p>
											<p className="text-xs opacity-75">{category.count}</p>
										</div>
										<div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
											<div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
												<ArrowRight className="w-5 h-5" />
											</div>
										</div>
									</div>
								</div>

								{/* Hover overlay */}
								<div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-all duration-300"></div>
							</Link>
						</motion.div>
					))}
				</div>

				{/* View all categories button */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.5 }}
					viewport={{ once: true }}
					className="text-center mt-12"
				>
					<Link
						to="/products"
						className={`inline-flex items-center gap-2 px-8 py-4 border-2 border-${colors.primary} text-${colors.primary} rounded-lg font-semibold text-lg hover:bg-${colors.primary} hover:text-white transition-all duration-300 group`}
					>
						View All Products
						<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
					</Link>
				</motion.div>
			</div>
		</section>
	);
};

export default CategoryGrid;
