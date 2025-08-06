import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

<<<<<<< HEAD
export const redis = new Redis(process.env.UPSTASH_REDIS_URL);
=======
let redis = null;

try {
	if (process.env.UPSTASH_REDIS_URL) {
		redis = new Redis(process.env.UPSTASH_REDIS_URL);

		redis.on('error', (err) => {
			console.log('Redis connection error:', err.message);
			redis = null;
		});

		redis.on('connect', () => {
			console.log('Redis connected successfully');
		});
	} else {
		console.log('No Redis URL provided, running without Redis cache');
	}
} catch (error) {
	console.log('Failed to initialize Redis:', error.message);
	redis = null;
}

export { redis };
>>>>>>> 18d9e67 (Initial commit (without .env, with .env.example))
