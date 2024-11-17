// controllers/adminController.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Assignment from '../models/assignmentModel.js';

// Admin Registration
export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingAdmin = await User.findOne({ email, role: 'admin' });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await User.create({ name, email, password: hashedPassword, role: 'admin' });

        res.status(201).json({ message: 'Admin registered successfully', admin });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Admin Login
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const admin = await User.findOne({ email, role: 'admin' });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Existing Assignment Functions
export const getAssignments = async (req, res) => {
    try {
        const adminId = req.user.id;
        const assignments = await Assignment.find({ adminId }).populate('userId', 'name');

        res.status(200).json({ assignments });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const acceptAssignment = async (req, res) => {
    try {
        const { id } = req.params;

        const assignment = await Assignment.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });
        res.status(200).json({ message: 'Assignment accepted', assignment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const rejectAssignment = async (req, res) => {
    try {
        const { id } = req.params;

        const assignment = await Assignment.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
        res.status(200).json({ message: 'Assignment rejected', assignment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};