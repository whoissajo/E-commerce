import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const { classes, colors } = useTheme();
	const navigate = useNavigate();

	const handleAddToCart = (e) => {
		e.stopPropagation(); // Prevent navigation when clicking add to cart
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			// add to cart
			addToCart(product);
		}
	};

	const handleProductClick = () => {
		navigate(`/product/${product._id}`);
	};

	return (
		<div
			className={`flex w-full relative flex-col overflow-hidden rounded-lg border ${classes.card} shadow-lg cursor-pointer transition-transform hover:scale-105`}
			onClick={handleProductClick}
		>
			<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
				<img className='object-cover w-full' src={product.image} alt='product image' />
				<div className='absolute inset-0 bg-black bg-opacity-20' />
			</div>

			<div className='mt-4 px-5 pb-5'>
				<h5 className={`text-xl font-semibold tracking-tight text-${colors.text}`}>{product.name}</h5>
				<p className={`text-sm text-${colors.textSecondary} mt-1 mb-3 line-clamp-2`}>
					{product.description}
				</p>
				<div className='mt-2 mb-5 flex items-center justify-between'>
					<p>
						<span className={`text-3xl font-bold text-${colors.primary}`}>${product.price}</span>
					</p>
				</div>
				<button
					className={`flex items-center justify-center rounded-lg ${classes.button} px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-indigo-300 w-full transition-colors`}
					onClick={handleAddToCart}
				>
					<ShoppingCart size={22} className='mr-2' />
					Add to cart
				</button>
			</div>
		</div>
	);
};
export default ProductCard;
