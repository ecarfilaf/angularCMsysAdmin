import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	// Handle registration logic here
	const { username, email, password } = req.body;

	// Hash Password
	const hashedPassword = await bcrypt.hash(password, 10);

	console.log(hashedPassword);

	try {
		//Create user in DB logic here
		const newUser = await prisma.usu_usuarios.create({
			data: {
				UsuRut: 1,
				UsuDv: "1",
				UsuNombres: "John",
				UsuAPaterno: "Doe",
				UsuAMaterno: "Smith",
				UsuUsuario: username,
				UsuClave: hashedPassword,
				CodEstado: 1,
				CodTipoUsuario: 1,
				FecVigencia: new Date(),
				UsuEmail: email,
				UsuAvatar: "noavatar.jpg",
				FecIngReg: new Date(),
				UsuIngReg: "system",
				FunIngReg: "system",
				FecModReg: new Date(),
				UsuModReg: "system",
				FunModReg: "system",
			},
		});
		console.log(newUser);

		res.status(201).json({ message: "User created successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to create user!" });
	}
}

export const login = async (req, res) => {
	// Handle login logic here
	console.log("Login attempt req. ",req.body);
	const username = req.body.user.UsuUsuario;
	const password = req.body.user.UsuClave;
 
	try {
		console.log("Login attempt for user: ",username, " with password: ",password);
		// CHECK IF THE USER EXISTS
		const user = await prisma.usu_usuarios.findUnique({
			where: { UsuUsuario: String(username) },
		});
		console.log(user);

		if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

		// CHECK IF THE PASSWORD IS CORRECT

		const isPasswordValid = await bcrypt.compare(password, user.UsuClave);
		// console.log('Valid password:',isPasswordValid);

		if (!isPasswordValid)
			return res.status(400).json({ message: "Invalid Credentials!" });

		// GENERATE COOKIE TOKEN AND SEND TO THE USER

		// res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
		const age = 1000 * 60 * 60 * 24 * 7;
		//console.log('Cookie age',age);

		const token = jwt.sign(
			{
				...user,
				isAdmin: false,
			},
			process.env.JWT_SECRET_KEY,
			{ expiresIn: age }
		);
		//console.log(token);

		const { UsuClave: userPassword, ...userInfo } = user;
		//console.log(userInfo);

		res
			.cookie("token", token, {
				httpOnly: true,
				// secure:true,
				maxAge: age,
			})
			.status(200)
			.json({'token':token});
		console.log("Login successful");
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to login!."+err.message });
	}
};

export const logout = (req, res) => {
	res.clearCookie("token").status(200).json({ message: "Logout Successful" });
	console.log("Logout successful");
};
