import { Router } from 'express';
import { createCarForSale, upload, getCarForSaleById, getAllCarsForSale, updateCarForSale, deleteCarForSale } from '../controllers/CarForSaleController';
import {authenticateToken}  from '../middlewares/authMiddleware'
const router = Router();

router.post('/',authenticateToken, upload.array('photos'), createCarForSale);
router.get('/:id', getCarForSaleById);
router.get('/', getAllCarsForSale);
router.put('/:id',authenticateToken, updateCarForSale);
router.delete('/:id',authenticateToken, deleteCarForSale);

export default router;
