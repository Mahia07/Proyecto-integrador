import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Users } from '../models/usuarios.js';

const JWT_SECRET = 'my_temporary_secret'; 

const authRouter = express.Router();


authRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {

        const existingUser = await Users.findOne({ where: { username } });

        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        await Users.create({
            username,
            password: hashedPassword
        });

        res.status(200).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const user = await Users.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña ingresada con la almacenada
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el token de autenticación
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

export default authRouter;
