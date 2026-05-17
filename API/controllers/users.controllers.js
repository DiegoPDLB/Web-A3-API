import User from "../models/users.model.js";
import mongoose from 'mongoose';
import { genSalt, hashPassword } from '../utils/password.js';

export const getUsers = async (req, res) => {
    try {
        const dbConnected = mongoose.connection.readyState === 1;
        if (!dbConnected) return res.json([]);
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const dbConnected = mongoose.connection.readyState === 1;
        if (!dbConnected) return res.status(404).json({ message: 'Usuario no encontrado (DB desconectada)' });
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
        const dbConnected = mongoose.connection.readyState === 1;
        if (!dbConnected) {
            const userToReturn = { _id: Date.now().toString(), name, username, createdAt: new Date() };
            return res.status(201).json(userToReturn);
        }
        const exists = await User.findOne({ username });
        if (exists) return res.status(400).json({ message: 'Usuario ya existe' });
        const salt = await genSalt();
        const hashedPassword = await hashPassword(password, salt);
        const user = new User({ name, username, password: hashedPassword, salt });
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
        const dbConnected = mongoose.connection.readyState === 1;
        if (!dbConnected) return res.status(404).json({ message: 'Usuario no encontrado (DB desconectada)' });
        const update = { name, username };
        if (password) {
            const salt = await genSalt();
            update.password = await hashPassword(password, salt);
            update.salt = salt;
        }
        const user = await User.findByIdAndUpdate(id, update, { new: true }).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const delUser = async (req, res) => {
    try {
        const { id } = req.params;
        const dbConnected = mongoose.connection.readyState === 1;
        if (!dbConnected) return res.json({ message: 'Usuario eliminado (simulado)', user: { _id: id } });
        const user = await User.findByIdAndDelete(id).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};