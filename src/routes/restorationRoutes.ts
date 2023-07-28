// src/routes/restorationRoutes.ts
import { Router } from 'express';
import { createRestoration,upload } from '../controllers/RestorationController';

const router = Router();

// Create a new restoration vehicle
router.post('/',upload.array('photos', 4), createRestoration);

export default router;
