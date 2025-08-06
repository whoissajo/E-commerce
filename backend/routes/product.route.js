import express from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getFeaturedProducts,
	getProductsByCategory,
	getRecommendedProducts,
	toggleFeaturedProduct,
<<<<<<< HEAD
=======
	updateProduct,
>>>>>>> 18d9e67 (Initial commit (without .env, with .env.example))
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

<<<<<<< HEAD
router.get("/", getAllProducts);
=======
router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/all", getAllProducts); // Public route for all products
>>>>>>> 18d9e67 (Initial commit (without .env, with .env.example))
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
<<<<<<< HEAD
=======
router.put("/:id", protectRoute, adminRoute, updateProduct);
>>>>>>> 18d9e67 (Initial commit (without .env, with .env.example))
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;
