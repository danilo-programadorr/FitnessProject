import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// 🆕 Registro
router.post('/register', register);

// 🔐 Login
router.post('/login', login);

export default router;
