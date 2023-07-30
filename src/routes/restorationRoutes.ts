// src/routes/restorationRoutes.ts
import { Router } from 'express';
import { createRestoration,upload,getRestorationById,getAllRestorations,updateRestoration } from '../controllers/RestorationController';

const router = Router();

// Create a new restoration vehicle
router.post('/',upload.array('photos', 4), createRestoration);
router.get('/:id', getRestorationById);
router.get('/', getAllRestorations);
router.put('/:id', updateRestoration);

export default router;
