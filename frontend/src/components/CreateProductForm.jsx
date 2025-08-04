import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "", // Main image
		images: [], // Additional images
	});

	const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createProduct(newProduct);
			setNewProduct({ 
				name: "", 
				description: "", 
				price: "", 
				category: "", 
				image: "", 
				images: [] 
			});
		} catch {
			console.log("error creating a product");
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
				setNewProduct(prev => ({
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
					setNewProduct({ ...newProduct, image: reader.result });
				};
				reader.readAsDataURL(file);
			}
		}
	};

	const removeImage = (index, isAdditional = false) => {
		if (isAdditional) {
			setNewProduct(prev => ({
				...prev,
				images: prev.images.filter((_, i) => i !== index)
			}));
		} else {
			setNewProduct(prev => ({ ...prev, image: "" }));
		}
	};

	return (
		<motion.div
			className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='text-2xl font-semibold mb-6 text-indigo-300'>Create New Product</h2>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='name' className='block text-sm font-medium text-gray-300'>
						Product Name
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
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
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
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
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
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
						value={newProduct.category}
						onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
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
						{newProduct.image && (
							<div className='mt-2 relative inline-block'>
								<img 
									src={newProduct.image} 
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
								className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								<Upload className='h-5 w-5 inline-block mr-2' />
								Upload Additional Images
							</label>
						</div>
						{newProduct.images.length > 0 && (
							<div className='mt-2 flex flex-wrap gap-2'>
								{newProduct.images.map((img, index) => (
									<div key={index} className='relative'>
										<img 
											src={img} 
											alt={`Additional preview ${index}`} 
											className='h-24 w-24 object-cover rounded-md border border-gray-600'
										/>
										<button
											type='button'
											onClick={() => removeImage(index, true)}
											className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none'
										>
											<svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
												<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
											</svg>
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Create Product
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};
export default CreateProductForm;
