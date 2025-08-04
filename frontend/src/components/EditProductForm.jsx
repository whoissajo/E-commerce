import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, X } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const EditProductForm = ({ product, onClose }) => {
	const [updatedProduct, setUpdatedProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "", // Main image
		images: [], // Additional images
	});

	const { updateProduct, loading } = useProductStore();

	// Initialize form with product data
	useEffect(() => {
		if (product) {
			setUpdatedProduct({
				name: product.name || "",
				description: product.description || "",
				price: product.price || "",
				category: product.category || "",
				image: product.image || "",
				images: product.images || [],
			});
		}
	}, [product]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await updateProduct(product._id, updatedProduct);
			onClose(); // Close the form after successful update
		} catch (error) {
			console.log("Error updating product:", error);
		}
	};

	const handleImageChange = (e, isAdditional = false) => {
		const files = Array.from(e.target.files);
		if (isAdditional) {
			// Handle additional images
			const imagePromises = files.map(file => {
				return new Promise((resolve) => {
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result);
					reader.readAsDataURL(file);
				});
			});
			Promise.all(imagePromises).then(images => {
				setUpdatedProduct(prev => ({
					...prev,
					images: [...prev.images, ...images]
				}));
			});
		} else {
			// Handle main image (only first file)
			const file = files[0];
			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setUpdatedProduct(prev => ({ ...prev, image: reader.result }));
				};
				reader.readAsDataURL(file);
			}
		}
	};

	const removeImage = (index, isAdditional = false) => {
		if (isAdditional) {
			setUpdatedProduct(prev => ({
				...prev,
				images: prev.images.filter((_, i) => i !== index)
			}));
		} else {
			setUpdatedProduct(prev => ({ ...prev, image: "" }));
		}
	};

	return (
		<motion.div
			className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className='text-2xl font-semibold text-indigo-300'>Edit Product</h2>
				<button 
					onClick={onClose}
					className="text-gray-400 hover:text-white"
				>
					<X className="h-6 w-6" />
				</button>
			</div>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='name' className='block text-sm font-medium text-gray-300'>
						Product Name
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={updatedProduct.name}
						onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-indigo-500 focus:border-indigo-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='description' className='block text-sm font-medium text-gray-300'>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						value={updatedProduct.description}
						onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
						rows='3'                     
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm                           
						 py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 
						 focus:border-indigo-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='price' className='block text-sm font-medium text-gray-300'>
						Price
					</label>
					<input
						type='number' 
						id='price'
						name='price'
						value={updatedProduct.price}
						onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
						step='0.01'
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm 
						py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500
						 focus:border-indigo-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='category' className='block text-sm font-medium text-gray-300'>
						Category
					</label>
					<select
						id='category'
						name='category'
						value={updatedProduct.category}
						onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
						 shadow-sm py-2 px-3 text-white focus:outline-none 
						 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
						required
					>
						<option value=''>Select a category</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				<div className='space-y-4'>
					{/* Main Image Upload */}
					<div>
						<label className='block text-sm font-medium text-gray-300 mb-2'>Main Image</label>
						<div className='flex items-center'>
							<input 
								type='file' 
								id='mainImage' 
								className='sr-only' 
								accept='image/*' 
								onChange={(e) => handleImageChange(e, false)} 
							/>
							<label
								htmlFor='mainImage'
								className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								<Upload className='h-5 w-5 inline-block mr-2' />
								Upload Main Image
							</label>
						</div>
						{updatedProduct.image && (
							<div className='mt-2 relative inline-block'>
								<img 
									src={updatedProduct.image} 
									alt='Main preview' 
									className='h-24 w-24 object-cover rounded-md border border-gray-600'
								/>
								<button
									type='button'
									onClick={() => removeImage(0, false)}
									className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none'
								>
									<svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
									</svg>
								</button>
							</div>
						)}
					</div>

					{/* Additional Images Upload */}
					<div>
						<label className='block text-sm font-medium text-gray-300 mb-2'>Additional Images</label>
						<div className='flex items-center'>
							<input 
								type='file' 
								id='additionalImages' 
								className='sr-only' 
								accept='image/*' 
								onChange={(e) => handleImageChange(e, true)} 
								multiple
							/>
							<label
								htmlFor='additionalImages'
								className='ml-3 cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								<PlusCircle className='h-5 w-5 inline-block mr-2' />
								Upload Additional Images
							</label>
						</div>

						{updatedProduct.images && updatedProduct.images.length > 0 && (
							<div className='mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3'>
								{updatedProduct.images.map((img, idx) => (
									<div key={idx} className='relative'>
										<img
											src={img}
											alt={`Additional ${idx + 1}`}
											className='h-24 w-24 object-cover rounded-md border border-gray-600'
										/>
										<button
											type='button'
											onClick={() => removeImage(idx, true)}
											className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none'
											aria-label='Remove image'
										>
											<svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
												<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
											</svg>
										</button>
									</div>
								))}
							</div>
						)}
					</div> {/* end Additional Images upload section */}
				</div> {/* end space-y-4 container */}

				<div className='pt-4 flex items-center justify-end gap-3'>
					<button
						type='button'
						onClick={onClose}
						className='inline-flex items-center px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Cancel
					</button>
					<button
						type='submit'
						disabled={loading}
						className='inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60'
					>
						{loading ? <Loader className='h-4 w-4 mr-2 animate-spin' /> : null}
						Save Changes
					</button>
				</div>
			</form>
		</motion.div>
	);
};

export default EditProductForm;
