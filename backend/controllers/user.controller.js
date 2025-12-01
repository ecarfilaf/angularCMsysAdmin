import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

// //Test controller
// export const testUserRoute = (req, res) => {
// 	console.log('User test route accessed');
// 	res.status(201).json({ message: "User test route accessed" });
// };

// Get all users
export const getAllUsers = async (req, res) => {
	try {
		const users = await prisma.usu_usuarios.findMany();
		res.status(200).json(users);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to get users!" });
	}
};

// Get user by ID
export const getUser = async (req, res) => {
	const userId = parseInt(req.params.id);
	try {
		const user = await prisma.usu_usuarios.findUnique({
			where: { UsuRut: userId },
		});

		res.status(200).json(user);

	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to get user!" });
	}
};

// Update user
export const updateUser = async (req, res) => {
	const id = req.params.id;
	const tokenUserId = req.userId;
	const { password, avatar, ...inputs } = req.body;

	if (id !== tokenUserId) {
		return res.status(403).json({ message: "Not Authorized!" });
	}

	let updatedPassword = null;
	try {
		if (password) {
			updatedPassword = await bcrypt.hash(password, 10);
		}

		const updatedUser = await prisma.user.update({
			where: { id },
			data: {
				...inputs,
				...(updatedPassword && { password: updatedPassword }),
				...(avatar && { avatar }),
			},
		});

		const { password: userPassword, ...rest } = updatedUser;

		res.status(200).json(rest);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to update users!" });
	}
};

// Delete user
export const deleteUser = async (req, res) => {
	const id = parseInt(req.params.id);
	const tokenUserId = req.userId;

	// console.log("Delete User ID:", id);
	// console.log("Token User ID:", tokenUserId);
	if (id !== tokenUserId) {
		return res.status(403).json({ message: "Not Authorized!" });
	}

	try {
		await prisma.usu_usuarios.delete({
			where: { UsuRut: id },
		});
		res.status(200).json({ message: "User deleted" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to delete users!" });
	}
};
