import User from "../models/users.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const postUser = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const exists = await User.findOne({ username });
        if (exists) return res.status(400).json({ message: 'Usuario ya existe' });
        const user = new User({ name, username, password });
        await user.save();
        const userToReturn = user.toObject();
        delete userToReturn.password;
        res.status(201).json(userToReturn);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const putUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, username, password } = req.body;
        const user = await User.findByIdAndUpdate(
            id,
            { name, username, password },
            { new: true }
        ).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const delUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};