import { useState } from "react";
import { motion } from "framer-motion";
import { Trash, Star, Edit, X } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products, updateProduct } = useProductStore();
	const [editingProduct, setEditingProduct] = useState(null);
	const [updatedProduct, setUpdatedProduct] = useState({});

	const handleEditProduct = (product) => {
		setEditingProduct(product);
		setUpdatedProduct({
			name: product.name,
			price: product.price,
			category: product.category,
			description: product.description,
		});
	};

	const handleUpdateProduct = async () => {
		try {
			await updateProduct(editingProduct._id, updatedProduct);
			setEditingProduct(null);
		} catch (error) {
			console.error("Error updating product:", error);
		}
	};

	console.log("products", products);

	return (
		<motion.div
			className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<table className=' min-w-full divide-y divide-gray-700'>
				<thead className='bg-gray-700'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Product
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Price
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Category
						</th>

						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Featured
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Actions
						</th>
					</tr>
				</thead>

				<tbody className='bg-gray-800 divide-y divide-gray-700'>
					{products?.map((product) => (
						<tr key={product._id} className='hover:bg-gray-700'>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='flex items-center'>
									<div className='flex-shrink-0 h-10 w-10'>
										<img
											className='h-10 w-10 rounded-full object-cover'
											src={product.image}
											alt={product.name}
										/>
									</div>
									<div className='ml-4'>
										<div className='text-sm font-medium text-white'>{product.name}</div>
									</div>
								</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-gray-300'>${product.price.toFixed(2)}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-gray-300'>{product.category}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<button
									onClick={() => toggleFeaturedProduct(product._id)}
									className={`p-1 rounded-full ${
										product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
									} hover:bg-yellow-500 transition-colors duration-200`}
								>
									<Star className='h-5 w-5' />
								</button>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<button 
									onClick={() => handleEditProduct(product)}
									className='text-indigo-400 hover:text-indigo-300 mr-2'
								>
									<Edit className='h-5 w-5' />
								</button>
								<button
									onClick={() => deleteProduct(product._id)}
									className='text-red-400 hover:text-red-300'
								>
									<Trash className='h-5 w-5' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			
			{/* Edit Product Modal */}
			{editingProduct && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
					<div className='bg-gray-800 rounded-lg shadow-xl w-full max-w-md'>
						<div className='flex justify-between items-center p-4 border-b border-gray-700'>
							<h3 className='text-lg font-semibold text-white'>Edit Product</h3>
							<button 
								onClick={() => setEditingProduct(null)}
								className='text-gray-400 hover:text-white'
							>
								<X className='h-6 w-6' />
							</button>
						</div>
						<div className='p-4 space-y-4'>
							<div>
								<label className='block text-sm font-medium text-gray-300 mb-1'>Name</label>
								<input
									type='text'
									value={updatedProduct.name}
									onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
									className='w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-300 mb-1'>Price</label>
								<input
									type='number'
									value={updatedProduct.price}
									onChange={(e) => setUpdatedProduct({...updatedProduct, price: parseFloat(e.target.value)})}
									className='w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
									step='0.01'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-300 mb-1'>Category</label>
								<input
									type='text'
									value={updatedProduct.category}
									onChange={(e) => setUpdatedProduct({...updatedProduct, category: e.target.value})}
									className='w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-300 mb-1'>Description</label>
								<textarea
									value={updatedProduct.description}
									onChange={(e) => setUpdatedProduct({...updatedProduct, description: e.target.value})}
									className='w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
									rows='3'
								/>
							</div>
						</div>
						<div className='flex justify-end space-x-3 p-4 border-t border-gray-700'>
							<button
								onClick={() => setEditingProduct(null)}
								className='px-4 py-2 text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
							>
								Cancel
							</button>
							<button
								onClick={handleUpdateProduct}
								className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
							>
								Update
							</button>
						</div>
					</div>
				</div>
			)}
		</motion.div>
	);
};
export default ProductsList;
