import User from "../models/user.model.js";

export const createAdminUser = async () => {
	try {
		const adminEmail = process.env.ADMIN_EMAIL;
		const adminPassword = process.env.ADMIN_PASSWORD;
		const adminName = process.env.ADMIN_NAME;

		if (!adminEmail || !adminPassword || !adminName) {
			console.log("Admin credentials not provided in environment variables. Skipping admin user creation.");
			return;
		}

		// Check if admin user already exists
		const existingAdmin = await User.findOne({ email: adminEmail });
		
		if (existingAdmin) {
			// If user exists but is not admin, update their role
			if (existingAdmin.role !== "admin") {
				existingAdmin.role = "admin";
				await existingAdmin.save();
				console.log(`Updated existing user ${adminEmail} to admin role.`);
			} else {
				console.log(`Admin user ${adminEmail} already exists.`);
			}
			return;
		}

		// Create new admin user
		const adminUser = await User.create({
			name: adminName,
			email: adminEmail,
			password: adminPassword,
			role: "admin"
		});

		console.log(`Admin user created successfully: ${adminUser.email}`);
	} catch (error) {
		console.error("Error creating admin user:", error.message);
	}
};
