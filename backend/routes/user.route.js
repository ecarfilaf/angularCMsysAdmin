import express from 'express';
import { deleteUser, getAllUsers, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Define your user-related routes here
router.get('/', getAllUsers);
router.get('/:id', getUser);
// router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;