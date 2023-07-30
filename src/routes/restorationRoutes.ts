// src/routes/restorationRoutes.ts
import { Router } from 'express';
import { createRestoration,upload,getRestorationById,getAllRestorations,updateRestoration, deleteRestoration } from '../controllers/RestorationController';
import {authenticateToken}  from '../middlewares/authMiddleware'
const router = Router();

// Create a new restoration vehicle
router.post('/',authenticateToken,upload.array('photos', 4), createRestoration);
router.get('/:id', getRestorationById);
router.get('/', getAllRestorations);
router.put('/:id',authenticateToken, updateRestoration);
router.delete('/:id',authenticateToken, deleteRestoration);

export default router;
