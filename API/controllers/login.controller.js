import User from "../models/users.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });
        const userToReturn = user.toObject();
        delete userToReturn.password;
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'change_me', { expiresIn: '1h' });
        res.json({ isLogin: true, message: 'Autenticación exitosa', user: userToReturn, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};