// src/routes/restorationRoutes.ts
import { Router } from 'express';
import { createRestoration,upload,getRestorationById,getAllRestorations,updateRestoration, deleteRestoration } from '../controllers/RestorationController';

const router = Router();

// Create a new restoration vehicle
router.post('/',upload.array('photos', 4), createRestoration);
router.get('/:id', getRestorationById);
router.get('/', getAllRestorations);
router.put('/:id', updateRestoration);
router.delete('/:id', deleteRestoration);

export default router;
