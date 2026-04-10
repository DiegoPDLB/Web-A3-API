import User from "../models/users.model.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
        // Nota: actualmente la contraseña se compara en texto plano.
        // Para producción usar hashing (bcrypt) y comparar hashes.
        if (user.password !== password) return res.status(401).json({ message: 'Credenciales inválidas' });
        const userToReturn = user.toObject();
        delete userToReturn.password;
        res.json({ message: 'Autenticación exitosa', user: userToReturn });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};