import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const HeroSection = () => {
	const { classes, colors } = useTheme();
	const navigate = useNavigate();

	return (
		<section className="relative overflow-hidden min-h-screen flex items-center">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-blue-600/10 to-purple-600/20"></div>
			
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					animate={{
						x: [0, 100, 0],
						y: [0, -100, 0],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: "linear"
					}}
					className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"
				/>
				<motion.div
					animate={{
						x: [0, -100, 0],
						y: [0, 100, 0],
					}}
					transition={{
						duration: 25,
						repeat: Infinity,
						ease: "linear"
					}}
					className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
				/>
			</div>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
					>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className={`inline-flex items-center gap-2 px-4 py-2 bg-${colors.primary}/10 text-${colors.primary} rounded-full text-sm font-medium mb-6`}
						>
							<CheckCircle className="w-4 h-4" />
							New Collection Available
						</motion.div>

						<h1 className={`text-5xl lg:text-7xl font-bold text-${colors.text} mb-6 leading-tight`}>
							Discover Your
							<motion.span 
								className={`text-${colors.primary} block`}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.4 }}
							>
								Perfect Style
							</motion.span>
						</h1>

						<motion.p 
							className={`text-xl text-${colors.textSecondary} mb-8 leading-relaxed max-w-lg`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
						>
							Shop the latest trends in fashion, electronics, and lifestyle products. 
							Quality guaranteed with fast, free shipping on orders over $50.
						</motion.p>

						<motion.div 
							className="flex flex-col sm:flex-row gap-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}
						>
							<button
								onClick={() => navigate('/products')}
								className={`${classes.button} text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl transition-all`}
							>
								Shop Now
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</button>
							<button className={`${classes.buttonSecondary} px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 group`}>
								<Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
								Watch Video
							</button>
						</motion.div>

						{/* Trust indicators */}
						<motion.div 
							className="flex items-center gap-8 mt-12"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 1 }}
						>
							<div className="flex items-center gap-2">
								<div className="flex -space-x-2">
									{[1, 2, 3, 4].map((i) => (
										<div key={i} className={`w-8 h-8 bg-${colors.primary} rounded-full border-2 border-white`}></div>
									))}
								</div>
								<span className={`text-sm text-${colors.textSecondary}`}>50K+ Happy Customers</span>
							</div>
							<div className="flex items-center gap-1">
								{[1, 2, 3, 4, 5].map((i) => (
									<div key={i} className="w-4 h-4 text-yellow-400">★</div>
								))}
								<span className={`text-sm text-${colors.textSecondary} ml-2`}>4.9/5 Rating</span>
							</div>
						</motion.div>
					</motion.div>
					
					{/* Right content - Hero image */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative"
					>
						<div className="relative">
							<motion.img
								src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop"
								alt="Hero"
								className="rounded-2xl shadow-2xl w-full"
								whileHover={{ scale: 1.02 }}
								transition={{ duration: 0.3 }}
							/>
							
							{/* Floating elements */}
							<motion.div 
								className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 1.2 }}
							>
								<div className="flex items-center gap-4">
									<div className={`w-12 h-12 bg-${colors.primary} rounded-full flex items-center justify-center`}>
										<CheckCircle className="w-6 h-6 text-white" />
									</div>
									<div>
										<p className={`font-semibold text-${colors.text}`}>Quality Assured</p>
										<p className={`text-sm text-${colors.textSecondary}`}>Premium products only</p>
									</div>
								</div>
							</motion.div>

							<motion.div 
								className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 1.4 }}
							>
								<div className="text-center">
									<div className={`text-2xl font-bold text-${colors.primary}`}>Free</div>
									<div className={`text-sm text-${colors.textSecondary}`}>Shipping</div>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
